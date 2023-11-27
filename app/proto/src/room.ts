/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { SortTuple, VoidResponse } from "./common";

export interface DeleteRoomRequest {
  id: string;
}

export interface FindRoomRequest {
  id: string;
}

export interface FindRoomByNameRequest {
  name: string;
}

export interface UpdateRoomRequest {
  id: string;
  status: number;
}

export interface CreateRoomRequest {
  name: string;
  projectId: string;
  status: number;
  creatorId: string;
}

export interface FindRoomListRequest {
  limit: number;
  offset: number;
  creatorId: string;
  s: string;
  sorters: SortTuple[];
}

export interface FindRoomListResponse {
  total: number;
  data: Room[];
}

export interface Room {
  id: string;
  name: string;
  projectId: string;
  status: number;
  creatorId: string;
}

export interface RoomServiceClient {
  findRoomList(request: FindRoomListRequest, metadata?: Metadata): Observable<FindRoomListResponse>;

  findRoom(request: FindRoomRequest, metadata?: Metadata): Observable<Room>;

  findRoomByName(request: FindRoomByNameRequest, metadata?: Metadata): Observable<Room>;

  createRoom(request: CreateRoomRequest, metadata?: Metadata): Observable<Room>;

  updateRoom(request: UpdateRoomRequest, metadata?: Metadata): Observable<Room>;

  deleteRoom(request: DeleteRoomRequest, metadata?: Metadata): Observable<VoidResponse>;
}

export interface RoomServiceController {
  findRoomList(
    request: FindRoomListRequest,
    metadata?: Metadata,
  ): Promise<FindRoomListResponse> | Observable<FindRoomListResponse> | FindRoomListResponse;

  findRoom(request: FindRoomRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;

  findRoomByName(request: FindRoomByNameRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;

  createRoom(request: CreateRoomRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;

  updateRoom(request: UpdateRoomRequest, metadata?: Metadata): Promise<Room> | Observable<Room> | Room;

  deleteRoom(
    request: DeleteRoomRequest,
    metadata?: Metadata,
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;
}

export function RoomServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "findRoomList",
      "findRoom",
      "findRoomByName",
      "createRoom",
      "updateRoom",
      "deleteRoom",
    ];
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
