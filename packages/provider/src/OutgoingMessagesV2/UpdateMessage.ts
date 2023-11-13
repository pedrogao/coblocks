import { messageYjsUpdate } from 'y-protocols/sync'
import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2.js'

export class UpdateMessageV2 extends OutgoingMessageV2 {
  type = MessageType.Sync

  description = 'A document update'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    this.encoder.write('documentName', args.documentName!)
    this.encoder.write('type', this.type)

    this.encoder.write('stype', messageYjsUpdate)
    this.encoder.write('update', args.update)

    return this.encoder
  }
}
