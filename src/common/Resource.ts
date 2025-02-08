// Utility type: If OAuth is enabled, return the authenticated version, otherwise return the public version
import { SwcApiError, SwcApiResponse } from '@/common/SwcApiResponse'

export type Resource<TOAuth extends boolean, Public, Authenticated> = TOAuth extends true ? Authenticated : Public

export abstract class GenericResource {
  private resourceName: string

  protected constructor(resourceName: string) {
    this.resourceName = resourceName
  }

  protected async get<T>(endpointUrl: string, accessToken?: string): Promise<SwcApiResponse<T> | SwcApiError> {
    try {
      const url = `https://www.swcombine.com/ws/v2.0/${this.resourceName}/${endpointUrl}`
      return await fetch(url, {
        headers: {
          Accept: 'application/json',
          ...(accessToken ? { Authorization: `OAuth ${accessToken}` } : {}),
        },
      }).then((resp) => {
        if (resp.status >= 500) {
          console.log('responded:', resp.status)
          throw new Error('Not a valid response')
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
