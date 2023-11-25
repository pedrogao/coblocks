/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface CreateRoomMetadataRequest {
  roomId: string;
  metadata: string;
  creatorId: string;
}

export interface GetRoomMetadataRequest {
  roomId: string;
}

export interface UpdateRoomMetadataRequest {
  roomId: string;
  metadata: string;
}

export interface RoomMetadata {
  id: string;
  roomId: string;
  metadata: string;
  createTime: string;
  updateTime: string;
  creatorId: string;
}

export interface RoomMetadataServiceClient {
  getRoomMetadata(request: GetRoomMetadataRequest, metadata?: Metadata): Observable<RoomMetadata>;

  updateRoomMetadata(request: UpdateRoomMetadataRequest, metadata?: Metadata): Observable<RoomMetadata>;

  createRoomMetadata(request: CreateRoomMetadataRequest, metadata?: Metadata): Observable<RoomMetadata>;
}

export interface RoomMetadataServiceController {
  getRoomMetadata(
    request: GetRoomMetadataRequest,
    metadata?: Metadata,
  ): Promise<RoomMetadata> | Observable<RoomMetadata> | RoomMetadata;

  updateRoomMetadata(
    request: UpdateRoomMetadataRequest,
    metadata?: Metadata,
  ): Promise<RoomMetadata> | Observable<RoomMetadata> | RoomMetadata;

  createRoomMetadata(
    request: CreateRoomMetadataRequest,
    metadata?: Metadata,
  ): Promise<RoomMetadata> | Observable<RoomMetadata> | RoomMetadata;
}

export function RoomMetadataServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getRoomMetadata", "updateRoomMetadata", "createRoomMetadata"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RoomMetadataService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RoomMetadataService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ROOM_METADATA_SERVICE_NAME = "RoomMetadataService";
