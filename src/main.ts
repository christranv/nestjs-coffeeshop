import { RequestMethod } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import metadata from './metadata';
import { AllExceptionsFilter } from './shared/api/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api", {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  })

  // Config Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Coffee Shop')
    .setDescription('The Coffee Shop API document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Config port
  const configService = app.get(ConfigService);
  const port = configService.get<string>('http.port');
  if (!port) throw new Error('Missing PORT config');

  // Config exception filter
  const adapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(adapterHost));

  await app.listen(port);
}
bootstrap();
