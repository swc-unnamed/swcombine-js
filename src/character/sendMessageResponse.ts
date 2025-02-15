import { SwcUid } from '@/common'

export type SendMessageResponseSwc = SendMessageResponseSwcSuccess | SendMessageResponseSwcFailure

export type SendMessageResponseSwcSuccess = {
  result: {
    status: {
      value: 'created'
    }
    data: {
      successes: SendMessageResponseSwcRecipient[]
      failures: []
      attributes: {
        totalcreated: number
      }
    }
  }
}

type SendMessageResponseSwcFailure = {
  result: {
    status: {
      value: 'failed'
    }
    data: {
      failures: ['You were unable to send the message probably as you misspelled the receivers handle']
    }
  }
}

interface SendMessageResponseSwcRecipient {
  attributes: { uid: string }
  value: string
}

export interface SendMessageResult {
  messagesAttempted: number
  totalSuccessfullySent: number
  successfullySentTo: Recipient[]
  failedToSendTo: string[]
}

interface Recipient {
  uid: SwcUid
  name: string
}

export function isSuccess(response: SendMessageResponseSwc): response is SendMessageResponseSwcSuccess {
  return response.result.status.value === 'created'
}
