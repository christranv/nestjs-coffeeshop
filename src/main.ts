import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
// import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // app.use(compression());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('http.port');
  if (!port) throw new Error('Missing PORT config');

  await app.listen(port);
}
bootstrap();
