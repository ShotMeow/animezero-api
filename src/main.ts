import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

const APP_PORT = process.env.APP_PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors();

  await app.listen(APP_PORT, '0.0.0.0');

  return app.getUrl();
}

bootstrap().then((url) => console.log(`Server running on ${url}:${APP_PORT}`));
