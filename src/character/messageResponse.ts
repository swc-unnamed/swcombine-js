import { SwcUid } from '@/common'
import { SwcTimestamp } from '@/timestamps'

export interface MessageResponseSwc {
  message: {
    uid: string
    sender: { attributes: { uid: string }; value: string }
    receiver: { attributes: { uid: string }; value: string }
    time: { timestamp: string }
    communication: string
  }
}

export interface MessageResponse {
  uid: SwcUid
  sender: { uid: SwcUid; name: string }
  recipient: { uid: SwcUid; name: string }
  timestamp: SwcTimestamp
  communication: string
}

export function mapResponse(response: MessageResponseSwc): MessageResponse {
  return {
    uid: new SwcUid(response.message.uid),
    sender: { uid: new SwcUid(response.message.sender.attributes.uid), name: response.message.sender.value },
    recipient: { uid: new SwcUid(response.message.receiver.attributes.uid), name: response.message.receiver.value },
    timestamp: SwcTimestamp.fromUnixTimestamp(Number.parseInt(response.message.time.timestamp, 10)),
    communication: response.message.communication,
  }
}
