import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import {
  UserServiceController,
  USER_SERVICE_NAME,
  CreateUserRequest,
  FindUserRequest,
  User,
  UserServiceControllerMethods,
} from '@coblocks/proto';
import { UserService } from './dao/user.service';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'findUser')
  findUser(request: FindUserRequest, metadata?: Metadata): User | Promise<User> | Observable<User> {
    return this.userService.findUser(request.name).then((user) => {
      return {
        id: Number(user.id),
        name: user.name,
        role: user.role,
        password: user.password,
      };
    });
  }

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  createUser(
    request: CreateUserRequest,
    metadata?: Metadata,
  ): User | Promise<User> | Observable<User> {
    return this.userService
      .createUser({
        name: request.name,
        password: request.password,
        role: request.role,
      })
      .then((user) => {
        return {
          id: Number(user.id),
          name: user.name,
          role: user.role,
          password: '',
        };
      });
  }
}
