import { SwcUid } from '@/common/uid'

export interface HandleCheckResponse {
  character: {
    uid: string
    handle: string
  }
}

export interface HandleCheckResult {
  uid: SwcUid
  handle: string
}
