import { SwcTimestamp } from '@/timestamps'
import { SwcUid } from '@/common'

export interface CreditLogSwc {
  attributes: { transaction_id: number }
  time: { timestamp: string }
  amount: number
  sender: { attributes: { uid: string }; value: string }
  receiver: { attributes: { uid: string }; value: string }
  communication: string
}

export interface CreditLog {
  transactionId: number
  timestamp: SwcTimestamp
  /**
   * Amount transferred. Negative if the character sent credits, positive if they received credits.
   */
  amount: number
  sender: { uid: SwcUid; type: 'character' | 'faction'; name: string }
  receiver: { uid: SwcUid; type: 'character' | 'faction'; name: string }
  message: string
}

export function mapResponse(currentCharacterUid: SwcUid, creditLog: CreditLogSwc): CreditLog {
  return {
    transactionId: creditLog.attributes.transaction_id,
    timestamp: SwcTimestamp.fromUnixTimestamp(Number.parseInt(creditLog.time.timestamp, 10)),
    amount: creditLog.sender.attributes.uid === currentCharacterUid.uid ? creditLog.amount * -1 : creditLog.amount,
    sender: {
      uid: new SwcUid(creditLog.sender.attributes.uid),
      name: creditLog.sender.value,
      type: creditLog.sender.attributes.uid.startsWith('1:') ? 'character' : 'faction',
    },
    receiver: {
      uid: new SwcUid(creditLog.receiver.attributes.uid),
      name: creditLog.receiver.value,
      type: creditLog.receiver.attributes.uid.startsWith('1:') ? 'character' : 'faction',
    },
    message: creditLog.communication,
  }
}
