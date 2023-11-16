import { Server, onLoadDocumentPayload } from '@hocuspocus/server'
import { Logger } from '@hocuspocus/extension-logger'
import { SQLite } from '@hocuspocus/extension-sqlite'
import { slateNodesToInsertDelta } from '@slate-yjs/core'
import * as Y from 'yjs'

const initialValue = [{ type: 'paragraph', children: [{ text: '' }] }]

const server = Server.configure({
  port: 1234,
  address: '127.0.0.1',
  name: 'hocuspocus-fra1-01',
  extensions: [new Logger(), new SQLite()],

  async onLoadDocument(data: onLoadDocumentPayload) {
    if (data.document.isEmpty('spreadsheet')) {
      const doc = data.document
      const spreadsheetArray = doc.getArray('spreadsheet')
      const row1 = new Y.Array<any>()
      row1.push([{ value: '1' }, { value: 'pedro' }, { value: '=A1+A2' }])
      const row2 = new Y.Array<any>()
      row2.push([{ value: '2' }, { value: 'mike' }, { value: '' }])
      spreadsheetArray.push([row1, row2])
    }

    if (data.document.isEmpty('richtext')) {
      const insertDelta = slateNodesToInsertDelta(initialValue)
      const sharedRoot = data.document.get('richtext', Y.XmlText) as Y.XmlText
      sharedRoot.applyDelta(insertDelta)
    }

    return data.document
  },

  // async onAuthenticate(data) {
  //   if (data.token !== 'my-access-token') {
  //     throw new Error('Incorrect access token')
  //   }
  // },

  // Test error handling
  // async onConnect(data) {
  //   throw new Error('CRASH')
  // },

  // async onConnect(data) {
  //   await new Promise((resolve, reject) => setTimeout(() => {
  //     // @ts-ignore
  //     reject()
  //   }, 1337))
  // },

  // async onConnect(data) {
  //   await new Promise((resolve, reject) => setTimeout(() => {
  //     // @ts-ignore
  //     resolve()
  //   }, 1337))
  // },

  // Intercept HTTP requests
  // onRequest(data) {
  //   return new Promise((resolve, reject) => {
  //     const { response } = data
  //     // Respond with your custum content
  //     response.writeHead(200, { 'Content-Type': 'text/plain' })
  //     response.end('This is my custom response, yay!')

  //     // Rejecting the promise will stop the chain and no further
  //     // onRequest hooks are run
  //     return reject()
  //   })
  // },
})

// server.enableMessageLogging()

server.listen()
