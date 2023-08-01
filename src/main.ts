import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api/api.module';
// import * as compression from 'compression';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  // app.use(compression());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('http.port');
  if (!port) throw new Error('Missing PORT config');

  const config = new DocumentBuilder()
    .setTitle('nestjs-coffeeshop')
    .setDescription('The Coffee Shop API document')
    .setVersion('1.0')
    .addTag('apis')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
