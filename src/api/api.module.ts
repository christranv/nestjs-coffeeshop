import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppModule } from '../application/app.module';
import configuration from '../config/configuration';
import { validate } from '../config/validation';
import { AuthController } from './controllers/order.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      expandVariables: true,
    }),
    AppModule
  ],
  controllers: [AuthController],
})
export class ApiModule { }
