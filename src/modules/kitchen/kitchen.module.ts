import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { DomainEventHandlers } from './application/domain-handlers';
import { KitchenOrder } from './domain/kitchen-order';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([KitchenOrder])],
  providers: [...DomainEventHandlers],
})
export class KitchenModule {
}
