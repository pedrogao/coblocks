import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  ROOM_DOC_SERVICE_NAME,
  ROOM_HOOK_SERVICE_NAME,
  ROOM_METADATA_SERVICE_NAME,
  ROOM_SERVICE_NAME,
  RoomDocServiceClient,
  RoomHookServiceClient,
  RoomMetadataServiceClient,
  RoomServiceClient,
} from '@coblocks/proto';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class RoomService implements OnModuleInit {
  private roomClient: RoomServiceClient;
  private roomDocClient: RoomDocServiceClient;
  private roomHookClient: RoomHookServiceClient;
  private roomMetadataClient: RoomMetadataServiceClient;

  constructor(@Inject('room') private client: ClientGrpc) {}

  onModuleInit() {
    this.roomClient = this.client.getService<RoomServiceClient>(ROOM_SERVICE_NAME);
    this.roomDocClient = this.client.getService<RoomDocServiceClient>(ROOM_DOC_SERVICE_NAME);
    this.roomHookClient = this.client.getService<RoomHookServiceClient>(ROOM_HOOK_SERVICE_NAME);
    this.roomMetadataClient = this.client.getService<RoomMetadataServiceClient>(
      ROOM_METADATA_SERVICE_NAME,
    );
  }

  async findByName(name: string) {
    const resp = await this.roomClient
      .findRoomByName({
        name,
      })
      .toPromise();

    if (!resp) {
      return null;
    }

    const id = resp.id;
    const roomDoc = await this.roomDocClient.getRoomDoc({ roomId: id }).toPromise();
    const roomMetadata = await this.roomMetadataClient.getRoomMetadata({ roomId: id }).toPromise();

    return {
      id: resp.id,
      name: resp.name,
      projectId: resp.projectId,
      status: resp.status,
      creatorId: resp.creatorId,
      doc: roomDoc.doc,
      metadata: roomMetadata.metadata,
    };
  }

  async updateDoc(roomId: string, doc: string) {
    const resp = await this.roomDocClient
      .updateRoomDoc({
        roomId,
        doc,
      })
      .toPromise();

    return resp;
  }
}
