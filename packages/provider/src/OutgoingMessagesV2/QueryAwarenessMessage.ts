import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2.js'

export class QueryAwarenessMessageV2 extends OutgoingMessageV2 {
  type = MessageType.QueryAwareness

  description = 'Queries awareness states'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    this.encoder.write('d', args.documentName!)
    this.encoder.write('type', this.type)

    return this.encoder
  }
}
