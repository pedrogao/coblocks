import { applyAwarenessUpdate } from 'y-protocols/awareness'
import { messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate } from 'y-protocols/sync'
import { readSyncStep1, readSyncStep2, readUpdate } from '@hocuspocus/common'
import * as Y from 'yjs'
import Connection from './Connection.js'
import { Debugger } from './Debugger.js'
import Document from './Document.js'
import { IncomingMessageV2 } from './IncomingMessageV2.js'
import { OutgoingMessageV2 } from './OutgoingMessageV2.js'
import { MessageType } from './types.js'

export class MessageReceiverV2 {
  message: IncomingMessageV2

  logger: Debugger

  defaultTransactionOrigin?: string

  constructor(message: IncomingMessageV2, logger: Debugger, defaultTransactionOrigin?: string) {
    this.message = message
    this.logger = logger
    this.defaultTransactionOrigin = defaultTransactionOrigin
  }

  public apply(document: Document, connection?: Connection, reply?: (message: string) => void) {
    const { message } = this
    const type = message.read('type')
    // const emptyMessageLength = message.length

    switch (type) {
      case MessageType.Sync:
      case MessageType.SyncReply: {
        message.writeType(MessageType.Sync)
        this.readSyncMessage(message, document, connection, reply, type !== MessageType.SyncReply)

        if (message.canSend) {
          if (reply) {
            reply(message.toString())
          } else if (connection) {
            // TODO: We should log this, shouldn’t we?
            // this.logger.log({
            //   direction: 'out',
            //   type: MessageType.Awareness,
            //   category: 'Update',
            // })
            connection.send(message.toString())
          }
        }

        break
      }
      case MessageType.Awareness: {
        this.logger.log({
          direction: 'in',
          type: MessageType.Awareness,
          category: 'Update',
        })

        applyAwarenessUpdate(document.awareness, message.read('awareness'), connection)

        break
      }
      case MessageType.QueryAwareness: {
        this.applyQueryAwarenessMessage(document, reply)

        break
      }
      case MessageType.Stateless: {
        connection?.callbacks.statelessCallback({
          connection,
          documentName: document.name,
          document,
          payload: message.decoder.read('payload'),
        })

        break
      }
      case MessageType.BroadcastStateless: {
        const msg = message.read('payload')
        document.getConnections().forEach(connection => {
          connection.sendStateless(msg)
        })
        break
      }

      case MessageType.CLOSE: {
        connection?.close({
          code: 1000,
          reason: 'provider_initiated',
        })
        break
      }

      case MessageType.Auth:
        console.error(
          'Received an authentication message on a connection that is already fully authenticated. Probably your provider has been destroyed + recreated really fast.',
        )
        break

      default:
        console.error(
          `Unable to handle message: ${message}: no handler defined! Are your provider/server versions aligned?`,
        )
      // Do nothing
    }
  }

  readSyncMessage(
    message: IncomingMessageV2,
    document: Document,
    connection?: Connection,
    reply?: (message: string) => void,
    requestFirstSync = true,
  ) {
    const stype = message.read('stype') // step type

    switch (stype) {
      case messageYjsSyncStep1: {
        this.logger.log({
          direction: 'in',
          type: MessageType.Sync,
          category: 'SyncStep1',
        })

        readSyncStep1(message.decoder, message.encoder, document)

        // When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1.
        this.logger.log({
          direction: 'out',
          type: MessageType.Sync,
          category: 'SyncStep2',
        })

        if (reply && requestFirstSync) {
          const syncMessage = new OutgoingMessageV2(document.name)
            .createSyncReplyMessage()
            .writeFirstSyncStepFor(document)

          this.logger.log({
            direction: 'out',
            type: MessageType.Sync,
            category: 'SyncStep1',
          })

          reply(syncMessage.toString())
        } else if (connection) {
          const syncMessage = new OutgoingMessageV2(document.name)
            .createSyncMessage()
            .writeFirstSyncStepFor(document)

          this.logger.log({
            direction: 'out',
            type: MessageType.Sync,
            category: 'SyncStep1',
          })

          connection.send(syncMessage.toString())
        }
        break
      }
      case messageYjsSyncStep2:
        this.logger.log({
          direction: 'in',
          type: MessageType.Sync,
          category: 'SyncStep2',
        })

        if (connection?.readOnly) {
          // We're in read-only mode, so we can't apply the update.
          // Let's use snapshotContainsUpdate to see if the update actually contains changes.
          // If not, we can still ack the update
          const snapshot = Y.snapshot(document)
          // const update = decoding.readVarUint8Array(message.decoder);
          const update = message.decoder.read('update')
          if (Y.snapshotContainsUpdate(snapshot, update)) {
            // no new changes in update
            const ackMessage = new OutgoingMessageV2(document.name).writeSyncStatus(true)

            connection.send(ackMessage.toString())
          } else {
            // new changes in update that we can't apply, because readOnly
            const ackMessage = new OutgoingMessageV2(document.name).writeSyncStatus(false)

            connection.send(ackMessage.toString())
          }
          break
        }

        readSyncStep2(message.decoder, document, connection ?? this.defaultTransactionOrigin)

        if (connection) {
          connection.send(new OutgoingMessageV2(document.name).writeSyncStatus(true).toString())
        }
        break
      case messageYjsUpdate:
        this.logger.log({
          direction: 'in',
          type: MessageType.Sync,
          category: 'Update',
        })

        if (connection?.readOnly) {
          connection.send(new OutgoingMessageV2(document.name).writeSyncStatus(false).toString())
          break
        }

        readUpdate(message.decoder, document, connection)
        if (connection) {
          connection.send(new OutgoingMessageV2(document.name).writeSyncStatus(true).toString())
        }
        break
      default:
        throw new Error(`Received a message with an unknown type: ${stype}`)
    }

    return stype
  }

  applyQueryAwarenessMessage(document: Document, reply?: (message: string) => void) {
    const message = new OutgoingMessageV2(document.name).createAwarenessUpdateMessage(
      document.awareness,
    )

    if (reply) {
      reply(message.toString())
    }

    // TODO: We should add support for WebSocket connections, too, right?
    // this.logger.log({
    //   direction: 'out',
    //   type: MessageType.Sync,
    //   category: 'SyncStep1',
    // })

    // connection.send(syncMessage.toUint8Array())
  }
}
