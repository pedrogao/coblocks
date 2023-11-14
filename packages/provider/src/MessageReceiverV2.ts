import { readAuthMessageV2, readSyncMessage } from '@hocuspocus/common'
import * as awarenessProtocol from 'y-protocols/awareness'
import { messageYjsSyncStep2 } from 'y-protocols/sync.js'
import { HocuspocusProvider } from './HocuspocusProvider.js'
import { IncomingMessageV2 } from './IncomingMessageV2.js'
import { OutgoingMessageV2 } from './OutgoingMessageV2.js'
import { MessageType } from './types.js'

export class MessageReceiverV2 {
  message: IncomingMessageV2

  broadcasted = false

  constructor(message: IncomingMessageV2) {
    this.message = message
  }

  public setBroadcasted(value: boolean) {
    this.broadcasted = value

    return this
  }

  public apply(provider: HocuspocusProvider, emitSynced: boolean) {
    const { message } = this
    const type = message.readMessageType()

    // const emptyMessageLength = message.length()

    switch (type) {
      case MessageType.Sync:
        this.applySyncMessage(provider, emitSynced)
        break

      case MessageType.Awareness:
        this.applyAwarenessMessage(provider)
        break

      case MessageType.Auth:
        this.applyAuthMessage(provider)
        break

      case MessageType.QueryAwareness:
        this.applyQueryAwarenessMessage(provider)
        break

      case MessageType.Stateless:
        provider.receiveStateless(message.decoder.read('payload'))
        break

      case MessageType.SyncStatus: {
        const status = message.decoder.read('status')
        this.applySyncStatusMessage(provider, status)
        break
      }
      default:
        throw new Error(`Can’t apply message of unknown type: ${type}`)
    }

    // FIXMED: `varint`'s length is `1` but not same as `JSON.stringify`'s length
    // Reply
    if (message.canSend) {
      // length of documentName (considered in emptyMessageLength plus length of yjs sync type, set in applySyncMessage)
      if (this.broadcasted) {
        // TODO: Some weird TypeScript error
        // @ts-ignore
        provider.broadcast(OutgoingMessageV2, { encoder: message.encoder })
      } else {
        // TODO: Some weird TypeScript error
        // @ts-ignore
        provider.send(OutgoingMessageV2, { encoder: message.encoder })
      }
    }
  }

  private applySyncMessage(provider: HocuspocusProvider, emitSynced: boolean) {
    const { message } = this

    message.write('type', MessageType.Sync)

    // Apply update
    const syncMessageType = readSyncMessage(
      message.decoder,
      message.encoder,
      provider.document,
      provider,
    )

    // Synced once we receive Step2
    if (emitSynced && syncMessageType === messageYjsSyncStep2) {
      provider.synced = true
    }
  }

  applySyncStatusMessage(provider: HocuspocusProvider, applied: boolean) {
    if (applied) {
      provider.decrementUnsyncedChanges()
    }
  }

  private applyAwarenessMessage(provider: HocuspocusProvider) {
    if (!provider.awareness) return

    const { message } = this

    const awareness = message.read('awareness')
    awarenessProtocol.applyAwarenessUpdate(provider.awareness, awareness, provider)
  }

  private applyAuthMessage(provider: HocuspocusProvider) {
    const { message } = this

    readAuthMessageV2(
      message.decoder,
      provider.permissionDeniedHandler.bind(provider),
      provider.authenticatedHandler.bind(provider),
    )
  }

  private applyQueryAwarenessMessage(provider: HocuspocusProvider) {
    if (!provider.awareness) return

    const { message } = this

    message.write('type', MessageType.Awareness)
    const awareness = awarenessProtocol.encodeAwarenessUpdate(
      provider.awareness,
      Array.from(provider.awareness.getStates().keys()),
    )
    message.write('awareness', awareness)
  }
}
