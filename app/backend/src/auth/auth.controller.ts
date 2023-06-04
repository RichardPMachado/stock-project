import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { IAuthRequest } from './models/IAuthRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Request() req: IAuthRequest) {
    return this.authService.login(req.user);
  }
}
