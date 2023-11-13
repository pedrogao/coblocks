import * as encoding from 'lib0/encoding'
import * as decoding from 'lib0/decoding'
import { JsonDecoder, JsonEncoder } from './json'

enum AuthMessageType {
  Token = 0,
  PermissionDenied = 1,
  Authenticated = 2,
}

export const writeAuthentication = (encoder: encoding.Encoder, auth: string) => {
  encoding.writeVarUint(encoder, AuthMessageType.Token)
  encoding.writeVarString(encoder, auth)
}

export const writeAuthenticationV2 = (encoder: JsonEncoder, scope: 'readonly' | 'read-write') => {
  encoder.write('auth', AuthMessageType.Token)
  encoder.write('scope', scope)
}

export const writePermissionDenied = (encoder: encoding.Encoder, reason: string) => {
  encoding.writeVarUint(encoder, AuthMessageType.PermissionDenied)
  encoding.writeVarString(encoder, reason)
}

export const writePermissionDeniedV2 = (encoder: JsonEncoder, reason: string) => {
  encoder.write('auth', AuthMessageType.PermissionDenied)
  encoder.write('reason', reason)
}

export const writeAuthenticated = (encoder: encoding.Encoder, scope: 'readonly' | 'read-write') => {
  encoding.writeVarUint(encoder, AuthMessageType.Authenticated)
  encoding.writeVarString(encoder, scope)
}

export const writeAuthenticatedV2 = (encoder: JsonEncoder, scope: 'readonly' | 'read-write') => {
  encoder.write('auth', AuthMessageType.Authenticated)
  encoder.write('scope', scope)
}

export const readAuthMessage = (
  decoder: decoding.Decoder,
  permissionDeniedHandler: (reason: string) => void,
  authenticatedHandler: (scope: string) => void,
) => {
  switch (decoding.readVarUint(decoder)) {
    case AuthMessageType.PermissionDenied: {
      permissionDeniedHandler(decoding.readVarString(decoder))
      break
    }
    case AuthMessageType.Authenticated: {
      authenticatedHandler(decoding.readVarString(decoder))
      break
    }
    default:
  }
}

export const readAuthMessageV2 = (
  decoder: JsonDecoder,
  permissionDeniedHandler: (reason: string) => void,
  authenticatedHandler: (scope: string) => void,
) => {
  switch (decoder.read('auth')) {
    case AuthMessageType.PermissionDenied: {
      permissionDeniedHandler(decoder.read('reason'))
      break
    }
    case AuthMessageType.Authenticated: {
      authenticatedHandler(decoder.read('scope'))
      break
    }
    default:
  }
}
