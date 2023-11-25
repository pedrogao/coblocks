import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from '@coblocks/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<{ accessToken: string }> {
    let user = null;
    try {
      user = await this.userService.find(username);
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException("User doesn't exist");
    }

    if (!user) {
      throw new UnauthorizedException("User doesn't exist");
    }
    const ok = await verifyPassword(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { id: user.id, username: user.name, role: user.role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
