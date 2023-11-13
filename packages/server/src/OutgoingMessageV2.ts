import { Awareness, encodeAwarenessUpdate } from "y-protocols/awareness";
import { messageYjsSyncStep1, messageYjsUpdate } from "y-protocols/sync";
import * as Y from "yjs";
import { JsonEncoder, writeAuthenticatedV2, writePermissionDeniedV2 } from "@hocuspocus/common";
import Document from "./Document.js";
import { MessageType } from "./types.js";

export class OutgoingMessageV2 {
  jsonEncoder: JsonEncoder;

  type?: number;

  category?: string;

  constructor(documentName: string) {
    this.jsonEncoder = new JsonEncoder();

    this.jsonEncoder.write("documentName", documentName);
  }

  createSyncMessage(): OutgoingMessageV2 {
    this.type = MessageType.Sync;

    this.jsonEncoder.write("type", MessageType.Sync);

    return this;
  }

  createSyncReplyMessage(): OutgoingMessageV2 {
    this.type = MessageType.SyncReply;

    this.jsonEncoder.write("type", MessageType.SyncReply);

    return this;
  }

  createAwarenessUpdateMessage(
    awareness: Awareness,
    changedClients?: Array<any>
  ): OutgoingMessageV2 {
    this.type = MessageType.Awareness;
    this.category = "Update";

    const message = encodeAwarenessUpdate(
      awareness,
      changedClients || Array.from(awareness.getStates().keys())
    );

    this.jsonEncoder.write("type", MessageType.Awareness);
    this.jsonEncoder.write("message", message);

    return this;
  }

  writeQueryAwareness(): OutgoingMessageV2 {
    this.type = MessageType.QueryAwareness;
    this.category = "Update";

    this.jsonEncoder.write("type", MessageType.QueryAwareness);

    return this;
  }

  writeAuthenticated(readonly: boolean): OutgoingMessageV2 {
    this.type = MessageType.Auth;
    this.category = "Authenticated";

    this.jsonEncoder.write("type", MessageType.Auth);
    writeAuthenticatedV2(this.jsonEncoder, readonly ? "readonly" : "read-write");

    return this;
  }

  writePermissionDenied(reason: string): OutgoingMessageV2 {
    this.type = MessageType.Auth;
    this.category = "PermissionDenied";

    this.jsonEncoder.write("type", MessageType.Auth);
    writePermissionDeniedV2(this.jsonEncoder, reason);

    return this;
  }

  writeFirstSyncStepFor(document: Document): OutgoingMessageV2 {
    this.category = "SyncStep1";

    this.jsonEncoder.write("stype", messageYjsSyncStep1);

    const sv = Y.encodeStateVector(document);
    this.jsonEncoder.write("sv", sv);

    return this;
  }

  writeUpdate(update: Uint8Array): OutgoingMessageV2 {
    this.category = "Update";

    this.jsonEncoder.write("stype", messageYjsUpdate);
    this.jsonEncoder.write("update", update);

    return this;
  }

  writeStateless(payload: string): OutgoingMessageV2 {
    this.category = "Stateless";

    this.jsonEncoder.write("type", MessageType.Stateless);
    this.jsonEncoder.write("payload", payload);

    return this;
  }

  writeBroadcastStateless(payload: string): OutgoingMessageV2 {
    this.category = "Stateless";

    this.jsonEncoder.write("type", MessageType.BroadcastStateless);
    this.jsonEncoder.write("payload", payload);

    return this;
  }

  // TODO: should this be write* or create* as method name?
  writeSyncStatus(updateSaved: boolean): OutgoingMessageV2 {
    this.category = "SyncStatus";

    this.jsonEncoder.write("type", MessageType.SyncStatus);
    this.jsonEncoder.write("updateSaved", updateSaved);

    return this;
  }

  toString(): string {
    return this.jsonEncoder.toString();
  }
}
