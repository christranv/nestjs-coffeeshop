import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/validation';
import { BaristaModule } from './modules/barista/barista.module';
import { CounterModule } from './modules/counter/counter.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      expandVariables: true,
    }),
    // modules
    BaristaModule,
    CounterModule,
    KitchenModule
  ],
})
export class AppModule {
}
