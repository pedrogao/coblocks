import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import {
  UserServiceController,
  USER_SERVICE_NAME,
  CreateUserRequest,
  FindUserRequest,
  User,
  UserServiceControllerMethods,
  UpdateUserPasswordRequest,
} from '@coblocks/proto';
import { UserService } from './user.service';

@Controller()
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private userService: UserService) {}

  @GrpcMethod(USER_SERVICE_NAME, 'findUser')
  async findUser(request: FindUserRequest): Promise<User | undefined> {
    const user = await this.userService.findUser(request.name);
    if (!user) {
      throw new RpcException("User doesn't exist");
    }
    return {
      id: user.id.toString(),
      name: user.name,
      role: user.role,
      password: user.password,
    };
  }

  @GrpcMethod(USER_SERVICE_NAME, 'createUser')
  async createUser(request: CreateUserRequest): Promise<User> {
    return this.userService
      .createUser({
        name: request.name,
        password: request.password,
        role: request.role,
      })
      .then((user) => {
        return {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
          password: user.password,
        };
      });
  }

  @GrpcMethod(USER_SERVICE_NAME, 'updateUserPassword')
  async updateUserPassword(request: UpdateUserPasswordRequest): Promise<User> {
    return this.userService
      .updateUserPassword({
        name: request.name,
        password: request.password,
      })
      .then((user) => {
        return {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
          password: user.password,
        };
      });
  }
}
