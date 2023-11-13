import * as syncProtocol from 'y-protocols/sync'
import * as Y from 'yjs'
import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2.js'

export class SyncStepTwoMessageV2 extends OutgoingMessageV2 {
  type = MessageType.Sync

  description = 'Second sync step'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    if (typeof args.document === 'undefined') {
      throw new Error('The sync step two message requires document as an argument')
    }

    this.encoder.write('documentName', args.documentName!)
    this.encoder.write('type', this.type)

    this.encoder.write('stype', syncProtocol.messageYjsSyncStep2)
    const sv = Y.encodeStateAsUpdate(args.document)
    this.encoder.write('sv', sv)

    return this.encoder
  }
}
