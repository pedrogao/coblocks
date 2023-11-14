import { JsonDecoder, JsonEncoder } from '@hocuspocus/common'
import { MessageType } from './types.js'

export class IncomingMessageV2 {
  /**
   * Access to the received message.
   */
  decoder: JsonDecoder

  /**
   * Private encoder; can be undefined.
   *
   * Lazy creation of the encoder speeds up IncomingMessages that need only a decoder.
   */
  private encoderInternal?: JsonEncoder

  constructor(input: any) {
    if (!(input instanceof String)) {
      input = input.toString()
    }

    this.decoder = new JsonDecoder(input)
  }

  get encoder() {
    if (!this.encoderInternal) {
      this.encoderInternal = new JsonEncoder()
    }
    return this.encoderInternal
  }

  read(key: string) {
    return this.decoder.read(key)
  }

  toString() {
    return this.encoder.toString()
  }

  writeType(type: MessageType) {
    this.encoder.write('type', type)
  }

  write(key: string, val: any) {
    this.encoder.write(key, val)
  }

  get length(): number {
    return JSON.stringify(this.encoder).length
  }

  get canSend(): boolean {
    const keys = this.encoder.keys()
    const noSend = (keys.length === 2 && keys.includes('type') && keys.includes('documentName'))
      || (keys.length === 1 && keys.includes('documentName'))
    return !noSend
  }
}
