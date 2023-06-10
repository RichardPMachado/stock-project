import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User id: ${id} Not Found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User email: ${email} Not Found`);
    }
    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  async removeById(id: number): Promise<void> {
    const user = await this.findOne(id);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User id: ${id} Not Found`);
    }
    await this.prisma.user.delete({
      where: { id },
    });
    // return user;
  }
  async removeByEmail(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new NotFoundException(`User email: ${email} Not Found`);
    }
    await this.prisma.user.delete({
      where: { email },
    });
    // return user;
  }
}
