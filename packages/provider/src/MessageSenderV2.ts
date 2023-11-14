import * as bc from 'lib0/broadcastchannel'
import { JsonEncoder } from '@hocuspocus/common'
import { ConstructableOutgoingMessageV2 } from './types.js'

export class MessageSenderV2 {

  encoder: JsonEncoder

  message: any

  constructor(Message: ConstructableOutgoingMessageV2, args: any = {}) {
    this.message = new Message()
    this.encoder = this.message.get(args)
  }

  create() {
    return this.encoder.toString()
  }

  send(webSocket: any) {
    webSocket?.send(this.create())
  }

  broadcast(channel: string) {
    bc.publish(channel, this.create())
  }
}
