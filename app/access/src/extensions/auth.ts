import { Extension, onAuthenticatePayload, onConnectPayload } from '@hocuspocus/server';
import { CloseEvent, Forbidden, Unauthorized } from '@hocuspocus/common';
import { Logger, Injectable } from '@nestjs/common';
import { Permission, RoomStatus } from '@coblocks/common';
import { ProjectApikeyService } from '../service/project-apikey.service';
import { RoomService } from '../service/room.service';

@Injectable()
export class Auth implements Extension {
  private logger: Logger = new Logger(Auth.name);

  constructor(
    private projectApikeyService: ProjectApikeyService,
    private roomService: RoomService,
  ) {}

  async onConnect(data: onConnectPayload): Promise<any> {
    const { documentName: roomName } = data;
    this.logger.log(`onConnect: ${roomName}`);

    const room = await this.roomService.findByName(roomName);

    const forbidden: CloseEvent = {
      ...Forbidden,
    };

    if (!room) {
      forbidden.reason = `Room "${roomName}" not found.`;
      throw forbidden;
    }

    if (room.status === RoomStatus.Closed) {
      forbidden.reason = `Room "${roomName}" is closed.`;

      throw forbidden;
    }

    return {
      projectId: room.projectId,
      roomName: room.name,
      roomId: room.id,
    };
  }

  async onAuthenticate(data: onAuthenticatePayload): Promise<any> {
    const { token, documentName: roomName, connection } = data;
    this.logger.log(`onAuthenticate: ${roomName}`);

    const unauthorized: CloseEvent = {
      ...Unauthorized,
    };

    const apiKeyEntity = await this.projectApikeyService.findByApiKey(token);
    if (!apiKeyEntity) {
      unauthorized.reason = `api key not found.`;

      throw unauthorized;
    }

    if (!apiKeyEntity.status) {
      unauthorized.reason = `api key is disabled.`;

      throw unauthorized;
    }

    const room = await this.roomService.findByName(roomName);
    if (!room) {
      unauthorized.reason = `room not found.`;

      throw unauthorized;
    }

    const roomId = room.id;

    const includes = apiKeyEntity.roomList.includes(roomId);
    if (!includes) {
      unauthorized.reason = `api key can't access room ${roomName}.`;

      throw unauthorized;
    }

    connection.readOnly = apiKeyEntity.permission === Permission.ReadOnly;

    return {
      permission: apiKeyEntity.permission,
    };
  }
}
