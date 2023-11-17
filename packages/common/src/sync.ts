/**
 * @module sync-protocol
 */

import { messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate } from 'y-protocols/sync'
import * as Y from 'yjs'
import { JsonDecoder, JsonEncoder } from './json'

/**
 * @typedef {Map<number, number>} StateMap
 */

/**
 * Core Yjs defines two message types:
 * • YjsSyncStep1: Includes the State Set of the sending client. When received, the client should reply with YjsSyncStep2.
 * • YjsSyncStep2: Includes all missing structs and the complete delete set. When received, the client is assured that it
 *   received all information from the remote client.
 *
 * In a peer-to-peer network, you may want to introduce a SyncDone message type. Both parties should initiate the connection
 * with SyncStep1. When a client received SyncStep2, it should reply with SyncDone. When the local client received both
 * SyncStep2 and SyncDone, it is assured that it is synced to the remote client.
 *
 * In a client-server model, you want to handle this differently: The client should initiate the connection with SyncStep1.
 * When the server receives SyncStep1, it should reply with SyncStep2 immediately followed by SyncStep1. The client replies
 * with SyncStep2 when it receives SyncStep1. Optionally the server may send a SyncDone after it received SyncStep2, so the
 * client knows that the sync is finished.  There are two reasons for this more elaborated sync model: 1. This protocol can
 * easily be implemented on top of http and websockets. 2. The server shoul only reply to requests, and not initiate them.
 * Therefore it is necesarry that the client initiates the sync.
 *
 * Construction of a message:
 * [messageType : varUint, message definition..]
 *
 * Note: A message does not include information about the room name. This must to be handled by the upper layer protocol!
 *
 * stringify[messageType] stringifies a message definition (messageType is already read from the bufffer)
 */

/**
 * Yjs 核心定义了两种消息类型：
 * • YjsSyncStep1：包含发送客户端的状态集。接收到后，客户端应该回复 YjsSyncStep2。
 * • YjsSyncStep2：包含所有缺失的结构和完整的删除集。接收到后，客户端确信它接收到了远程客户端的所有信息。
 *
 * 在点对点网络中，你可能想引入一个 SyncDone 消息类型。双方都应该用 SyncStep1 初始化连接。当一个客户端接收到 SyncStep2 时，它应该回复 SyncDone。
 * 当本地客户端接收到 SyncStep2 和 SyncDone 后，它确信已经与远程客户端同步。
 *
 * 在客户端-服务器模型中，你想以不同的方式处理这个问题：客户端应该用 SyncStep1 初始化连接。
 * 当服务器接收到 SyncStep1 时，它应该立即回复 SyncStep2，紧接着是 SyncStep1。
 * 客户端在接收到 SyncStep1 时回复 SyncStep2。
 * 可选的是，服务器在接收到 SyncStep2 后可以发送一个 SyncDone，这样客户端就知道同步已经完成。
 *
 * 这个更复杂的同步模型有两个原因：
 * 1. 这个协议可以容易地在 http 和 websockets 之上实现。
 * 2. 服务器应该只回复请求，而不是发起它们。因此，必须由客户端发起同步。
 *
 * 消息的构建：
 * [messageType : varUint, 消息定义..]
 *
 * 注意：消息不包括关于房间名称的信息。这必须由上层协议处理！
 *
 * stringify[messageType] 字符串化一个消息定义（messageType 已经从缓冲区读取）
 */

/**
 * Create a sync step 1 message based on the state of the current shared document.
 */
export const writeSyncStep1 = (encoder: JsonEncoder, doc: Y.Doc) => {
  encoder.write('stype', messageYjsSyncStep1)
  const sv = Y.encodeStateVector(doc)
  encoder.write('sv', sv)
}

/**
 * Create a sync step 2 message based on the state of the current shared document.
 */
export const writeSyncStep2 = (
  encoder: JsonEncoder,
  doc: Y.Doc,
  encodedStateVector: Uint8Array,
) => {
  encoder.write('stype', messageYjsSyncStep2)
  encoder.write('update', Y.encodeStateAsUpdate(doc, encodedStateVector))
}

/**
 * Read SyncStep1 message and reply with SyncStep2.
 */
export const readSyncStep1 = (decoder: JsonDecoder, encoder: JsonEncoder, doc: Y.Doc) => writeSyncStep2(encoder, doc, decoder.read('sv'))

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 */
export const readSyncStep2 = (decoder: JsonDecoder, doc: Y.Doc, transactionOrigin: any) => {
  try {
    const update = decoder.read('update')
    Y.applyUpdate(doc, update, transactionOrigin)
  } catch (error) {
    // This catches errors that are thrown by event handlers
    console.error('Caught error while handling a Yjs update', error)
  }
}

/**
 * Write a Yjs Update message.
 */
export const writeUpdate = (encoder: JsonEncoder, update: Uint8Array) => {
  encoder.write('stype', messageYjsUpdate)
  encoder.write('update', update)
}

/**
 * Read and apply Structs and then DeleteStore to a y instance.
 */
export const readUpdate = readSyncStep2

/**
 * Read a message and return the message type.
 */
export const readSyncMessage = (
  decoder: JsonDecoder,
  encoder: JsonEncoder,
  doc: Y.Doc,
  transactionOrigin: any,
) => {
  const stepType = decoder.read('stype')
  switch (stepType) {
    case messageYjsSyncStep1: {
      readSyncStep1(decoder, encoder, doc)
      break
    }
    case messageYjsSyncStep2: {
      readSyncStep2(decoder, doc, transactionOrigin)
      break
    }
    case messageYjsUpdate: {
      readUpdate(decoder, doc, transactionOrigin)
      break
    }
    default: {
      throw new Error(`Unknown message type ${stepType}`)
    }
  }
  return stepType
}
