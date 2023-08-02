import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { CommandHandlers } from './application/commands/handlers';
import { DomainEventHandlers } from './application/domain-event-handlers';
import { QueryHandlers } from './application/queries/handlers';
import { LineItem } from './domain/line-item';
import { Order } from './domain/order';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Order, LineItem])],
  providers: [...CommandHandlers, ...QueryHandlers, ...DomainEventHandlers],
})
export class CounterModule {

}
