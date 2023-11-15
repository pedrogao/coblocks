import { JsonEncoder, JsonDecoder } from '@hocuspocus/common'
import { MessageType } from './types.js'

export class IncomingMessageV2 {
  data: any

  encoder: JsonEncoder

  decoder: JsonDecoder

  constructor(data: any) {
    this.data = data
    this.encoder = new JsonEncoder()
    this.decoder = new JsonDecoder(this.data)
  }

  peek(key: string): string {
    return this.decoder.read(key)
  }

  readMessageType(): MessageType {
    return this.decoder.read('type')
  }

  read(key: string) {
    return this.decoder.read(key)
  }

  write(key: string, val: any) {
    this.encoder.write(key, val)
  }

  length() {
    return this.encoder.toString().length
  }

  get canSend() {
    const keys = this.encoder.keys()
    const noSend = (keys.length === 2 && keys.includes('type') && keys.includes('d'))
      || (keys.length === 1 && keys.includes('d'))
    return !noSend
  }
}
