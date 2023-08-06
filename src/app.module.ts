import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { BaristaModule } from './modules/barista/barista.module';
import { CounterModule } from './modules/counter/counter.module';
import { KitchenModule } from './modules/kitchen/kitchen.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
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
