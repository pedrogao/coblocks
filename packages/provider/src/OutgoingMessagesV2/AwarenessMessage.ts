import { encodeAwarenessUpdate } from 'y-protocols/awareness'
import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2.js'

export class AwarenessMessageV2 extends OutgoingMessageV2 {
  type = MessageType.Awareness

  description = 'Awareness states update'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    if (typeof args.awareness === 'undefined') {
      throw new Error('The awareness message requires awareness as an argument')
    }

    if (typeof args.clients === 'undefined') {
      throw new Error('The awareness message requires clients as an argument')
    }

    this.encoder.write('documentName', args.documentName!)
    this.encoder.write('type', this.type)

    let awarenessUpdate
    if (args.states === undefined) {
      awarenessUpdate = encodeAwarenessUpdate(args.awareness, args.clients)
    } else {
      awarenessUpdate = encodeAwarenessUpdate(args.awareness, args.clients, args.states)
    }

    this.encoder.write('awareness', awarenessUpdate)

    return this.encoder
  }
}
