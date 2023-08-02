import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetFulfilledOrdersQuery } from '../application/queries/impl';
import { PlaceOrderCommand } from '../domain/commands/place-order.command';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) { }

  @Get()
  @HttpCode(200)
  async getFulfilledOrders() {
    return this.commandBus.execute(new GetFulfilledOrdersQuery);
  }

  @Post()
  @HttpCode(200)
  async place(command: PlaceOrderCommand) {
    await this.commandBus.execute(command);
  }
}
