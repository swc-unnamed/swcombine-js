import { SwcUid } from '@/common/uid'

export interface TransferCreditsResponseSwc {
  transactions: {
    transaction: [TransferCreditsResponseSwcTransaction]
  }
}

type TransferCreditsResponseSwcTransaction =
  | {
      succeeded: true
      recipient: { attributes: { uid: string }; value: string }
      sender: { attributes: { uid: string }; value: string }
      amount: number
      reason: string
    }
  | {
      succeeded: false
      failurereason: 'recipient_not_found' | 'Credit amount to transfer exceeds available credits.'
    }

export type TransferCreditsResponse =
  | {
      succeeded: false
      failureReason: 'Recipient not found' | 'Credit amount to transfer exceeds available credits.'
    }
  | {
      succeeded: true
      transactionReceipt: {
        recipient: { uid: SwcUid; name: string }
        sender: { uid: SwcUid; name: string }
        creditAmount: number
        reason: string
      }
    }

export function mapResponse(response: TransferCreditsResponseSwc): TransferCreditsResponse {
  const objectOfInterest = response.transactions.transaction[0]
  if (!objectOfInterest.succeeded) {
    return {
      succeeded: false,
      failureReason:
        objectOfInterest.failurereason === 'recipient_not_found'
          ? 'Recipient not found'
          : objectOfInterest.failurereason,
    }
  }

  return {
    succeeded: true,
    transactionReceipt: {
      recipient: { uid: new SwcUid(objectOfInterest.recipient.attributes.uid), name: objectOfInterest.recipient.value },
      sender: { uid: new SwcUid(objectOfInterest.sender.attributes.uid), name: objectOfInterest.sender.value },
      creditAmount: objectOfInterest.amount,
      reason: objectOfInterest.reason,
    },
  }
}
