import { SwcApiError, SwcApiResponse } from '@/common/SwcApiResponse'
import { PaginatedResult } from '@/common/PaginatedResult'
import { AuthService } from '@/client/services/AuthService'

// Utility type: If OAuth is enabled, return the authenticated version, otherwise return the public version
export type Resource<TOAuth extends boolean, Public, Authenticated> = TOAuth extends true ? Authenticated : Public
export interface PaginateOptions {
  itemCount: number
  params?: Record<string, string | number | boolean>
  mapFunc?: mapFunc
  auth?: AuthService
}

export interface mapFunc {
  (item: any): any
}

export abstract class BaseHttpResource {
  protected readonly resourceName: string

  protected constructor(resourceName: string) {
    this.resourceName = resourceName
  }

  protected async get<T>(
    endpointUrl: string,
    accessToken?: string | Promise<string>,
    params?: object,
  ): Promise<SwcApiResponse<T> | SwcApiError> {
    return this.send('GET', endpointUrl, params, undefined, accessToken)
  }

  protected async post<T>(
    endpointUrl: string,
    body: object,
    accessToken?: string | Promise<string>,
    params?: object,
  ): Promise<SwcApiResponse<T> | SwcApiError> {
    return this.send('POST', endpointUrl, params, body, accessToken)
  }

  protected async put<T>(
    endpointUrl: string,
    body: object,
    accessToken?: string | Promise<string>,
    params?: object,
  ): Promise<SwcApiResponse<T> | SwcApiError> {
    return this.send('PUT', endpointUrl, params, body, accessToken)
  }

  protected async delete<T>(
    endpointUrl: string,
    accessToken?: string | Promise<string>,
    params?: object,
  ): Promise<SwcApiResponse<T> | SwcApiError> {
    return this.send('DELETE', endpointUrl, params, undefined, accessToken)
  }

  protected onApiError(endpoint: string, errorMessage: string): never {
    throw new Error(`Something went wrong while attempting to call the ${endpoint} endpoint: ${errorMessage}`)
  }

  private async send<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpointUrl: string,
    params?: object,
    body?: object,
    accessToken?: string | Promise<string>,
  ): Promise<SwcApiResponse<T> | SwcApiError> {
    const accessTokenToUse = accessToken instanceof Promise ? await accessToken : accessToken

    try {
      const url =
        `https://www.swcombine.com/ws/v2.0/${this.resourceName}/${endpointUrl}` +
        (params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : '')

      return await fetch(url, {
        method: method,
        headers: {
          Accept: 'application/json',
          ...(accessTokenToUse ? { Authorization: `OAuth ${accessTokenToUse}` } : {}),
          ...(body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
        },
        ...(body ? { body: new URLSearchParams(body as Record<string, string>) } : {}),
      }).then((resp) => {
        if (resp.status >= 500) {
          console.log('responded:', resp.status)
          throw new Error("SWC threw an internal server error. The problem is on SWC's side, not our side.")
        } else if (resp.status >= 200 && resp.status < 300) {
          return resp.json() as unknown as SwcApiResponse<T>
        } else {
          return resp.json() as unknown as SwcApiError
        }
      })
    } catch (err) {
      console.warn(err)
      throw err
    }
  }
}

export abstract class GenericResource extends BaseHttpResource {
  constructor(resourceName: string) {
    super(resourceName)
  }

  paginateGet<T, TSwc>(endpointUrl: string, options: PaginateOptions) {
    const {
      itemCount,
      params = {},
      mapFunc = (item: any) => item,
      auth
    } = options
    return new PaginatedResult<T, TSwc>(this.resourceName, endpointUrl, params, itemCount, mapFunc, auth)
  }

}
