import test from 'ava'
import { IncomingMessageV2, MessageType, OutgoingMessageV2 } from '@hocuspocus/server'

test('outgoing message constructor', async t => {
  const message = new OutgoingMessageV2('test')

  t.is(message.type, undefined)
  t.pass()
})

test('outgoing message createSyncMessage', async t => {
  const message = new OutgoingMessageV2('test')
  message.createSyncMessage()

  t.is(message.type, MessageType.Sync)

  const serialized = message.toString()
  t.is(serialized, '{"documentName":"test","type":0}')

  t.pass()
})

test('outgoing message writePermissionDenied', async t => {
  const message = new OutgoingMessageV2('test')

  message.writePermissionDenied('just for testing')

  t.is(message.type, MessageType.Auth)

  const serialized = message.toString()
  t.is(serialized, '{"documentName":"test","type":2,"auth":1,"reason":"just for testing"}')

  t.pass()
})

test('outgoing message writeUpdate', async t => {
  const message = new OutgoingMessageV2('test')

  const update = Buffer.from('just for testing')
  message.writeUpdate(update)

  t.is(message.category, 'Update')

  const serialized = message.toString()
  t.is(serialized, '{"documentName":"test","stype":2,"update":"anVzdCBmb3IgdGVzdGluZw=="}')

  t.pass()
})

test('incoming message read', async t => {
  const message = new OutgoingMessageV2('test')

  const update = Buffer.from('just for testing')
  message.writeUpdate(update)

  t.is(message.category, 'Update')

  const serialized = message.toString()
  t.is(serialized, '{"documentName":"test","stype":2,"update":"anVzdCBmb3IgdGVzdGluZw=="}')

  const incoming = new IncomingMessageV2(serialized)
  t.is(incoming.read('stype'), 2)
  t.is(incoming.read('update').length, Buffer.from('just for testing').length)

  t.pass()
})
