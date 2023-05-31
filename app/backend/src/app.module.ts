import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
// import { ProductsModule } from './products/products.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
