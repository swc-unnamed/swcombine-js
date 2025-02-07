export interface SwcApiResponse<T> {
  version: string
  timestamp: number
  resource: string
  request: string
  swcapi: T
}
