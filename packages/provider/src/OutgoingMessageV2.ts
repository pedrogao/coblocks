import { JsonEncoder } from '@hocuspocus/common'
import { MessageType, OutgoingMessageArgumentsV2, OutgoingMessageInterfaceV2 } from './types.js'

export class OutgoingMessageV2 implements OutgoingMessageInterfaceV2 {
  encoder: JsonEncoder

  type?: MessageType

  constructor() {
    this.encoder = new JsonEncoder()
  }

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    return args.encoder
  }

  toString() {
    return this.encoder.toString()
  }
}
