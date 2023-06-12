import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { validateHash } from '@/utils/hash';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UnauthorizedError } from './error/unauthorized.error';
import { IUserPayload } from './models/IUserPayload';
import { IUserToken } from './models/IUserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(user: User): Promise<IUserToken> {
    const payload: IUserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid: boolean = await validateHash(
        password,
        user.password,
      );

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }
}
