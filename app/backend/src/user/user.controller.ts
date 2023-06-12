import { IsPublic } from 'src/auth/decorators/is-public.decorator';

import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete('id/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeById(@Param('id') id: string) {
    return this.userService.removeById(+id);
  }

  @Delete('email/:email')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeByEmail(@Param('email') email: string) {
    return this.userService.removeByEmail(email);
  }
}
