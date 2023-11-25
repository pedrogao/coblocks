/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { VoidResponse } from "./common";

export interface UpdateRoomHookRequest {
  id: string;
  url?: string | undefined;
  method?: string | undefined;
  body?: string | undefined;
  header?: string | undefined;
  type?: string | undefined;
}

export interface DeleteRoomHookRequest {
  id: string;
}

export interface CreateRoomHookRequest {
  roomId: string;
  url: string;
  method: string;
  body: string;
  header: string;
  type: string;
  creatorId: string;
}

export interface FindRoomHookListRequest {
  roomId: string;
  limit: number;
  offset: number;
}

export interface FindRoomHookListResponse {
  data: RoomHook[];
  total: number;
}

export interface RoomHook {
  id: string;
  roomId: string;
  url: string;
  method: string;
  body: string;
  header: string;
  type: string;
  createdTime: string;
  updatedTime: string;
  creatorId: string;
}

export interface RoomHookServiceClient {
  createRoomHook(request: CreateRoomHookRequest, metadata?: Metadata): Observable<RoomHook>;

  findRoomHookList(request: FindRoomHookListRequest, metadata?: Metadata): Observable<FindRoomHookListResponse>;

  updateRoomHook(request: UpdateRoomHookRequest, metadata?: Metadata): Observable<RoomHook>;

  deleteRoomHook(request: DeleteRoomHookRequest, metadata?: Metadata): Observable<VoidResponse>;
}

export interface RoomHookServiceController {
  createRoomHook(
    request: CreateRoomHookRequest,
    metadata?: Metadata,
  ): Promise<RoomHook> | Observable<RoomHook> | RoomHook;

  findRoomHookList(
    request: FindRoomHookListRequest,
    metadata?: Metadata,
  ): Promise<FindRoomHookListResponse> | Observable<FindRoomHookListResponse> | FindRoomHookListResponse;

  updateRoomHook(
    request: UpdateRoomHookRequest,
    metadata?: Metadata,
  ): Promise<RoomHook> | Observable<RoomHook> | RoomHook;

  deleteRoomHook(
    request: DeleteRoomHookRequest,
    metadata?: Metadata,
  ): Promise<VoidResponse> | Observable<VoidResponse> | VoidResponse;
}

export function RoomHookServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createRoomHook", "findRoomHookList", "updateRoomHook", "deleteRoomHook"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RoomHookService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RoomHookService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ROOM_HOOK_SERVICE_NAME = "RoomHookService";
