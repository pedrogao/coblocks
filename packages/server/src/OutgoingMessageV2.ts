import { Awareness, encodeAwarenessUpdate } from 'y-protocols/awareness'
import { messageYjsSyncStep1, messageYjsUpdate } from 'y-protocols/sync'
import * as Y from 'yjs'
import { JsonEncoder, writeAuthenticatedV2, writePermissionDeniedV2 } from '@hocuspocus/common'
import Document from './Document.js'
import { MessageType } from './types.js'

export class OutgoingMessageV2 {
  encoder: JsonEncoder

  type?: number

  category?: string

  constructor(documentName: string) {
    this.encoder = new JsonEncoder()

    this.encoder.write('documentName', documentName)
  }

  createSyncMessage(): OutgoingMessageV2 {
    this.type = MessageType.Sync

    this.encoder.write('type', MessageType.Sync)

    return this
  }

  createSyncReplyMessage(): OutgoingMessageV2 {
    this.type = MessageType.SyncReply

    this.encoder.write('type', MessageType.SyncReply)

    return this
  }

  createAwarenessUpdateMessage(
    awareness: Awareness,
    changedClients?: Array<any>,
  ): OutgoingMessageV2 {
    this.type = MessageType.Awareness
    this.category = 'Update'

    const awarenessEncoded = encodeAwarenessUpdate(
      awareness,
      changedClients || Array.from(awareness.getStates().keys()),
    )

    this.encoder.write('type', MessageType.Awareness)
    this.encoder.write('awareness', awarenessEncoded)

    return this
  }

  writeQueryAwareness(): OutgoingMessageV2 {
    this.type = MessageType.QueryAwareness
    this.category = 'Update'

    this.encoder.write('type', MessageType.QueryAwareness)

    return this
  }

  writeAuthenticated(readonly: boolean): OutgoingMessageV2 {
    this.type = MessageType.Auth
    this.category = 'Authenticated'

    this.encoder.write('type', MessageType.Auth)
    writeAuthenticatedV2(this.encoder, readonly ? 'readonly' : 'read-write')

    return this
  }

  writePermissionDenied(reason: string): OutgoingMessageV2 {
    this.type = MessageType.Auth
    this.category = 'PermissionDenied'

    this.encoder.write('type', MessageType.Auth)
    writePermissionDeniedV2(this.encoder, reason)

    return this
  }

  writeFirstSyncStepFor(document: Document): OutgoingMessageV2 {
    this.category = 'SyncStep1'

    this.encoder.write('stype', messageYjsSyncStep1)

    const sv = Y.encodeStateVector(document)
    this.encoder.write('sv', sv)

    return this
  }

  writeUpdate(update: Uint8Array): OutgoingMessageV2 {
    this.category = 'Update'

    this.encoder.write('stype', messageYjsUpdate)
    this.encoder.write('update', update)

    return this
  }

  writeStateless(payload: string): OutgoingMessageV2 {
    this.category = 'Stateless'

    this.encoder.write('type', MessageType.Stateless)
    this.encoder.write('payload', payload)

    return this
  }

  writeBroadcastStateless(payload: string): OutgoingMessageV2 {
    this.category = 'Stateless'

    this.encoder.write('type', MessageType.BroadcastStateless)
    this.encoder.write('payload', payload)

    return this
  }

  // TODO: should this be write* or create* as method name?
  writeSyncStatus(updateSaved: boolean): OutgoingMessageV2 {
    this.category = 'SyncStatus'

    this.encoder.write('type', MessageType.SyncStatus)
    this.encoder.write('status', updateSaved)

    return this
  }

  toString(): string {
    return this.encoder.toString()
  }
}
