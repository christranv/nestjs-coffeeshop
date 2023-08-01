import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { validate } from '../config/validation';
import { AppModule } from '../application/app.module';

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
