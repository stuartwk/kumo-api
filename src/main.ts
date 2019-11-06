import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/kumo\.chat$/, /api\.opennode\.co$/, 'http://localhost:4200'],
  });

  await app.listen(3000);
}
bootstrap();
