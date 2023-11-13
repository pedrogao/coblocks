import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2.js'

export class StatelessMessageV2 extends OutgoingMessageV2 {
  type = MessageType.Stateless

  description = 'A stateless message'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    this.encoder.write('documentName', args.documentName!)
    this.encoder.write('type', this.type)
    this.encoder.write('payload', args.payload ?? '')

    return this.encoder
  }
}
