import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { HealthController } from './health.controller';
import { BaristaModule } from './modules/barista/barista.module';
import { CounterModule } from './modules/counter/counter.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      expandVariables: true,
    }),
    TerminusModule,
    // modules
    UserModule,
    BaristaModule,
    CounterModule,
    KitchenModule
  ],
  controllers: [HealthController]
})
export class AppModule {
}
