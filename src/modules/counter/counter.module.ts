import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { OrderController } from './api/order.controller';
import { CommandHandlers } from './application/commands/handlers';
import { DomainEventHandlers } from './application/domain-event-handlers';
import { QueryHandlers } from './application/queries/handlers';
import { Item } from './domain/item';
import { LineItem } from './domain/line-item';
import { Order } from './domain/order';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Order, Item, LineItem])],
  providers: [...CommandHandlers, ...QueryHandlers, ...DomainEventHandlers],
  controllers: [OrderController]
})
export class CounterModule {

}
