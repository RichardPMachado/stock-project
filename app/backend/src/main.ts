import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const PORT = process.env.APP_PORT || 3001;
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(PORT, () =>
    Logger.log(`Server running on port ${PORT}`, 'Bootstrap'),
  );
}
bootstrap();
