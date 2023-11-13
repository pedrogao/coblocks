import { writeAuthenticationV2 } from '@hocuspocus/common'
import { MessageType, OutgoingMessageArgumentsV2 } from '../types.js'
import { OutgoingMessageV2 } from '../OutgoingMessageV2'

export class AuthenticationMessageV2 extends OutgoingMessageV2 {
  type = MessageType.Auth

  description = 'Authentication'

  get(args: Partial<OutgoingMessageArgumentsV2>) {
    if (typeof args.token === 'undefined') {
      throw new Error('The authentication message requires `token` as an argument.')
    }

    this.encoder.write('documentName', args.documentName!)
    this.encoder.write('type', this.type)
    writeAuthenticationV2(this.encoder, args.token as any)

    return this.encoder
  }
}
