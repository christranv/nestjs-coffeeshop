import { GetFulfilledOrdersQuery } from '@/src/application/queries/impl';
import { PlaceOrderCommand } from '@/src/domain/counter/commands/place-order.command';
import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) { }

  @Get()
  @HttpCode(200)
  async getFulfillmentOrders() {
    return this.commandBus.execute(new GetFulfilledOrdersQuery);
  }

  @Post()
  @HttpCode(200)
  async place(command: PlaceOrderCommand) {
    await this.commandBus.execute(command);
  }
}
