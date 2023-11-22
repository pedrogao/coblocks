/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface UpdateRoomRequest {
  id: number;
  status: number;
}

export interface CreateRoomRequest {
  name: string;
  projectId: number;
  status: number;
  creatorId: number;
}

export interface FindRoomListRequest {
  projectId: number;
  limit: number;
  offset: number;
}

export interface FindRoomListResponse {
  count: number;
  page: number;
  total: number;
  pageCount: number;
  data: Room[];
}

export interface Room {
  id: number;
  name: string;
  projectId: number;
  status: number;
  creatorId: number;
}

export interface RoomServiceClient {
  findRoomList(request: FindRoomListRequest, metadata?: Metadata): Observable<FindRoomListResponse>;

  createRoom(request: CreateRoomRequest, metadata?: Metadata): Observable<Room>;

  updateRoom(request: UpdateRoomRequest, metadata?: Metadata): Observable<Room>;
}

export interface RoomServiceController {
  findRoomList(
    request: FindRoomListRequest,
    metadata?: Metadata,
  ): Promise<FindRoomListResponse> | Observable<FindRoomListResponse> | FindRoomListResponse;

  createRoom(request: CreateRoomRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;

  updateRoom(request: UpdateRoomRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;
}

export function RoomServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findRoomList", "createRoom", "updateRoom"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RoomService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RoomService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ROOM_SERVICE_NAME = "RoomService";
