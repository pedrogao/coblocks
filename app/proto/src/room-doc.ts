/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface CreateRoomDocRequest {
  roomId: string;
  doc: string;
  creatorId: string;
}

export interface GetRoomDocRequest {
  roomId: string;
}

export interface UpdateRoomDocRequest {
  roomId: string;
  doc: string;
}

export interface RoomDoc {
  id: string;
  roomId: string;
  doc: string;
  createTime: string;
  updateTime: string;
  creatorId: string;
}

export interface RoomDocServiceClient {
  createRoomDoc(request: CreateRoomDocRequest, metadata?: Metadata): Observable<RoomDoc>;

  getRoomDoc(request: GetRoomDocRequest, metadata?: Metadata): Observable<RoomDoc>;

  updateRoomDoc(request: UpdateRoomDocRequest, metadata?: Metadata): Observable<RoomDoc>;
}

export interface RoomDocServiceController {
  createRoomDoc(request: CreateRoomDocRequest, metadata?: Metadata): Promise<RoomDoc> | Observable<RoomDoc> | RoomDoc;

  getRoomDoc(request: GetRoomDocRequest, metadata?: Metadata): Promise<RoomDoc> | Observable<RoomDoc> | RoomDoc;

  updateRoomDoc(request: UpdateRoomDocRequest, metadata?: Metadata): Promise<RoomDoc> | Observable<RoomDoc> | RoomDoc;
}

export function RoomDocServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createRoomDoc", "getRoomDoc", "updateRoomDoc"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RoomDocService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RoomDocService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ROOM_DOC_SERVICE_NAME = "RoomDocService";
