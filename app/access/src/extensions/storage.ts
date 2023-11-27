import { Database, DatabaseConfiguration } from '@hocuspocus/extension-database';
import { Injectable, Logger } from '@nestjs/common';
import { Base64 } from 'js-base64';
import { RoomService } from '../service/room.service';

export interface StorageConfiguration extends DatabaseConfiguration {}

@Injectable()
export class Storage extends Database {
  private logger: Logger = new Logger(Storage.name);
  private roomId?: string;

  configuration: StorageConfiguration = {
    fetch: async ({ documentName }) => {
      // document name => room name
      return new Promise((resolve, reject) => {
        this.roomService
          .findByName(documentName)
          .then((room) => {
            if (!room) {
              reject(new Error(`Room "${documentName}" not found.`));
              return;
            }
            const doc = room.doc;
            if (!doc) {
              reject(new Error(`Document "${documentName}" not found.`));
              return;
            }

            this.roomId = room.id;
            resolve(Base64.toUint8Array(doc));
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    store: async ({ documentName, state }) => {
      return new Promise((resolve, reject) => {
        if (!this.roomId) {
          reject(new Error(`Room not found.`));
          return;
        }

        this.roomService
          .updateDoc(this.roomId, Base64.fromUint8Array(state))
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  };

  constructor(private roomService: RoomService) {
    super({});
  }

  async onConfigure() {}

  async onListen() {
    this.logger.log(`Storage extension loaded.`);
  }
}
