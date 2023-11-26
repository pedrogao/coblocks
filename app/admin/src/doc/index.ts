import * as Y from 'yjs';
import { Base64 } from 'js-base64';

export const emptyDoc = () => {
  const doc = new Y.Doc();
  const update = Y.encodeStateAsUpdate(doc);
  return Base64.fromUint8Array(update);
};
