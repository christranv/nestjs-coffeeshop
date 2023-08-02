import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  })

  const config = new DocumentBuilder()
    .setTitle('NestJS Coffee Shop')
    .setDescription('The Coffee Shop API document')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<string>('http.port');
  if (!port) throw new Error('Missing PORT config');

  await app.listen(port);
}
bootstrap();
