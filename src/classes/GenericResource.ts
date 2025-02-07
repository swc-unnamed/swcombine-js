/**
 *
 */
export abstract class GenericResource {
  private resourceName: string

  protected constructor(resourceName: string) {
    this.resourceName = resourceName
  }

  protected async get<T>(endpointUrl: string): Promise<T> {
    try {
      const url = `https://www.swcombine.com/ws/v2.0/${this.resourceName}/${endpointUrl}`
      return await fetch(url, {
        headers: {
          Accept: 'application/json',
        }
      })
        .then(resp => {
          if (!resp.ok) {
            console.log('responded:', resp.status)
            throw new Error('Not a valid response')
          } else {
            return resp.json()
          }
        })
    } catch (err) {
      console.warn(err)
      throw err
    }
  }
}
