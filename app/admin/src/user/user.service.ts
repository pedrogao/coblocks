import { USER_SERVICE_NAME, UserServiceClient } from '@coblocks/proto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Role, hashPassword } from '@coblocks/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private userClient: UserServiceClient;

  constructor(@Inject('user') private client: ClientGrpc) {}

  onModuleInit() {
    this.userClient = this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  async find(username: string) {
    const user = await this.userClient.findUser({ name: username }).toPromise();
    if (!user || !user.id) {
      return null;
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const { username, password } = dto;
    const role = Role.Common;
    const hashedPassword = await hashPassword(password);

    const user = await this.userClient
      .createUser({ name: username, password: hashedPassword, role })
      .toPromise();

    if (!user || !user.id) {
      return null;
    }
    return user;
  }
}
