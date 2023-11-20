/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface CreateUserRequest {
  name: string;
  password: string;
  role: number;
}

export interface FindUserRequest {
  name: string;
}

export interface User {
  id: number;
  name: string;
  password: string;
  role: number;
}

export interface UserServiceClient {
  findUser(request: FindUserRequest, metadata?: Metadata): Observable<User>;

  createUser(request: CreateUserRequest, metadata?: Metadata): Observable<User>;
}

export interface UserServiceController {
  findUser(request: FindUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;

  createUser(request: CreateUserRequest, metadata?: Metadata): Promise<User> | Observable<User> | User;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findUser", "createUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
