export interface SwcApiResponse<T> {
  version: string
  timestamp: number
  resource: string
  request: string
  swcapi: T
}

export type SwcApiError = SwcApiResponse<{ error_code: number; error_message: string }>
