import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { KitchenController } from './api/kitchen.controller';
import { DomainEventHandlers } from './application/domain-handlers';
import { KitchenOrder } from './domain/kitchen-order';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([KitchenOrder])],
  providers: [...DomainEventHandlers],
  controllers: [KitchenController]
})
export class KitchenModule {
}
