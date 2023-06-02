import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

import { Injectable } from '@nestjs/common';

import { UnauthorizedError } from './error/unauthorized.error';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = bcrypt.compareSync(password, user.password);

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
