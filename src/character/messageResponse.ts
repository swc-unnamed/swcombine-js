import { SwcUid } from '@/common'
import { SwcTimestamp } from '@/timestamps'

export interface MessageEntrySwc {
  attributes: { uid: string }
  sender: { attributes: { uid: string }; value: string }
  receiver: { attributes: { uid: string }; value: string }
  time: { timestamp: string }
}

export interface MessageEntry {
  uid: SwcUid
  sender: { uid: SwcUid; name: string }
  receiver: { uid: SwcUid; name: string }
  timestamp: SwcTimestamp
}

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

export function mapEntry(response: MessageEntrySwc): MessageEntry {
  return {
    uid: new SwcUid(response.attributes.uid),
    sender: { uid: new SwcUid(response.sender.attributes.uid), name: response.sender.value },
    receiver: { uid: new SwcUid(response.receiver.attributes.uid), name: response.receiver.value },
    timestamp: SwcTimestamp.fromUnixTimestamp(Number.parseInt(response.time.timestamp, 10)),
  }
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
