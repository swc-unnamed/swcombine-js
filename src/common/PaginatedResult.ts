import { GenericResource } from '@/common/Resource'
import { AuthService } from '@/client/services/AuthService'

type PaginatedResultSwc<T> = {
  attributes: {
    start: number
    total: number
    count: number
  }
} & Record<string, T[]>
type PaginatedResponseSwc<T> = Record<string, PaginatedResultSwc<T>>

/**
 * A wrapper around paginated API results. Offers function to work with these pages.
 */
export class PaginatedResult<T, TSwc> extends GenericResource {
  private readonly endpointUrl: string
  private readonly params: Record<string, string | number | boolean>
  private readonly itemCount: number
  private readonly mapFunc: (item: TSwc) => T
  private auth?: AuthService

  private fetchedPages: number[] = []
  private fetchedItems: T[] = []
  private totalItems: number = -1
  private pageSize: number = -1
  private get totalPages(): number {
    return this.totalItems === -1 ? -1 : Math.ceil(this.totalItems / this.pageSize)
  }

  constructor(
    resourceName: string,
    endpointUrl: string,
    params: Record<string, string | number | boolean>,
    itemCount: number,
    mapFunc: (item: TSwc) => T,
    auth?: AuthService,
  ) {
    super(resourceName)
    this.endpointUrl = endpointUrl
    this.params = params
    this.itemCount = itemCount
    this.mapFunc = mapFunc
    this.auth = auth
  }

  /**
   * Get the total number of items according to the API.<br>
   * Note: if no items have been retrieved yet, this function sends an API request to the web services to fetch page 1.
   * @throws Error
   */
  public async getTotalCount(): Promise<number> {
    if (this.totalItems === -1) {
      await this.fetchPageIfNotLoaded(1)
    }
    return this.totalItems
  }

  /**
   * Get the total number of pages.<br>
   * Note: if no items or pages have been retrieved yet, this function sends an API request to the web services to fetch page 1.
   * @throws Error
   */
  public async getTotalPages(): Promise<number> {
    if (this.totalItems === -1) {
      await this.fetchPageIfNotLoaded(1)
    }
    return this.totalPages
  }

  /**
   * Get the amount of items per page.<br>
   * Note: if no items or pages have been retrieved yet, this function sends an API request to the webservices to fetch page 1.
   * @throws Error
   */
  public async getPageSize(): Promise<number> {
    if (this.pageSize === -1) {
      await this.fetchPageIfNotLoaded(1)
    }
    return this.pageSize
  }

  /**
   * Get a page worth of items.
   * @param pageNumber page to retrieve, 1 or higher. If the page number is higher than the total number of pages, an empty array is returned.
   * @throws Error
   */
  public async getPage(pageNumber: number): Promise<T[]> {
    if (pageNumber <= 0) {
      throw new Error(`${pageNumber} is not a valid page number. Must be 1 or higher.`)
    }

    if (this.totalItems === -1) {
      await this.fetchPageIfNotLoaded(pageNumber)
    }

    if (pageNumber <= this.totalPages && !this.fetchedPages.includes(pageNumber)) {
      await this.fetchPageIfNotLoaded(pageNumber)
    }

    return this.fetchedItems.slice(this.getStartIndex(pageNumber), this.getEndIndex(pageNumber))
  }

  /**
   * Get a range of items<br>
   * **⚠️Warning⚠️**: if the range crosses over multiple pages, then all the involved pages will need to be fetched from the API. this may eat into your rate limit quota. **use with care!**
   * @throws Error
   * @param startIndex start index, inclusive
   * @param endIndex end index, inclusive
   */
  public async getRange(startIndex: number, endIndex: number): Promise<T[]> {
    if (startIndex < 0 || endIndex < 0) {
      throw new Error(`${startIndex < 0 ? startIndex : endIndex} is not a valid index. Must be 0 or higher.`)
    }

    if (endIndex < startIndex) return []

    const requiredPages = await this.getRequiredPagesForRange(startIndex, endIndex)
    requiredPages.forEach((page) => this.fetchPageIfNotLoaded(page))

    return this.fetchedItems.slice(startIndex, endIndex + 1)
  }

  /**
   * Get an iterable object which you can use to iterate over all results.<br>
   * Example usage: `for await (const system of systems.iterate()) { }`<br>
   * **⚠️Warning⚠️**: The iterator will retrieve ALL results. For large result sets with lots of pages, this means **a request will be sent to the web services for EVERY page**. This can eat into your rate limit quota. **use with care!**<br>
   * If you're searching for a specific item, then once it's found you should break out of the loop. The iterator is implemented so that it only loads each page as you get to it, so breaking out of the loop means it will stop fetching new pages.
   * @throws Error
   * @param startIndex optional param, which you can use to skip some items before iterating.
   * @returns {AsyncIterable}
   */
  public iterate(startIndex = 0): AsyncIterable<T> {
    let done = false
    let currentIndex = startIndex - 1
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    return {
      [Symbol.asyncIterator](): AsyncIterator<T> {
        return {
          async next(): Promise<IteratorResult<T, T>> {
            if (done) {
              return { value: self.fetchedItems[self.totalItems - 1], done: true }
            }

            currentIndex++

            const requiredPage = await self.getPageNumberForIndex(currentIndex)
            await self.fetchPageIfNotLoaded(requiredPage)
            return { value: self.fetchedItems[currentIndex], done: currentIndex >= self.totalItems }
          },
          async return(value: T | PromiseLike<T>): Promise<IteratorResult<T, T>> {
            done = true
            return { value: value instanceof Promise ? await value : value, done }
          },
          async throw(): Promise<IteratorResult<T, T>> {
            done = true
            return { value: undefined as T, done: true }
          },
        }
      },
    }
  }

  private getStartIndex(page: number): number {
    return page === 1 ? 1 : this.effectivePageSize * (page - 1) + 1
  }

  private getEndIndex(page: number): number {
    const calculatedEndIndex = this.effectivePageSize * page
    return this.totalItems ? Math.min(calculatedEndIndex, this.totalItems) : calculatedEndIndex
  }

  private async getPageNumberForIndex(index: number): Promise<number> {
    if (this.pageSize === -1) {
      const bestGuessPageNumber = Math.floor(index / this.itemCount) + 1
      await this.fetchPageIfNotLoaded(bestGuessPageNumber)
    }
    return this.pageSize === 0 ? 1 : Math.floor(index / this.pageSize!) + 1
  }

  private get effectivePageSize() {
    return this.pageSize === -1 ? this.itemCount : this.pageSize
  }

  private async getRequiredPagesForRange(startIndex: number, endIndex: number): Promise<number[]> {
    const startPage = await this.getPageNumberForIndex(startIndex)
    const endPage = await this.getPageNumberForIndex(endIndex)

    const result = []
    for (let i = startPage; i <= endPage; i++) {
      result.push(i)
    }
    return result
  }

  private async fetchPageIfNotLoaded(page: number) {
    if (page < 1) {
      throw new Error('Cannot fetch negative page number.')
    }
    if (this.fetchedPages.includes(page)) return
    if (this.totalPages !== -1 && page > this.totalPages) return

    const params = {
      ...this.params,
      start_index: this.getStartIndex(page),
      item_count: this.effectivePageSize,
    }

    const response = await this.get<PaginatedResponseSwc<TSwc>>(this.endpointUrl, this.auth?.getAccessToken(), params)
    if ('error_code' in response.swcapi) {
      this.onApiError(this.endpointUrl, response.swcapi.error_message as string)
    }

    const swcApiKey = Object.keys(response.swcapi)[0]
    const result = response.swcapi[swcApiKey]

    if (this.totalItems === -1) {
      this.totalItems = result.attributes.total
      this.pageSize = result.attributes.count || 0
    }
    const startIndexAccordingToApi = result.attributes.start

    const collectionKey = Object.keys(result).find((key) => key !== 'attributes')!
    const collection = result[collectionKey] as TSwc[]
    collection.forEach((item, index) => {
      this.fetchedItems[startIndexAccordingToApi + index - 1] = this.mapFunc(item)
    })
    this.fetchedPages.push(page)
  }
}
