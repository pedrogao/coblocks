import { Base64 } from 'js-base64'

const dirtyKeys = ['message', 'sv', 'update', 'awareness']

const isDirty = (key: string) => dirtyKeys.includes(key)

export class JsonEncoder {
  private encoder: { [key: string]: any }

  constructor() {
    this.encoder = {}
  }

  public write(key: string, value: any) {
    if (isDirty(key) && value instanceof Uint8Array) {
      value = Base64.fromUint8Array(value)
    }

    this.encoder[key] = value
    return this
  }

  toString(): string {
    return JSON.stringify(this.encoder)
  }
}

export class JsonDecoder {
  private decoder: { [key: string]: any }

  constructor(json: string) {
    this.decoder = JSON.parse(json)
  }

  public read(key: string): any {
    const val = this.decoder[key]
    if (isDirty(key) && typeof val === 'string') {
      return Base64.toUint8Array(val)
    }
    return val
  }
}
