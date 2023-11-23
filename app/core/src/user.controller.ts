import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
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
  async findUser(request: FindUserRequest, metadata?: Metadata): Promise<User> {
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
  async createUser(request: CreateUserRequest, metadata?: Metadata): Promise<User> {
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
