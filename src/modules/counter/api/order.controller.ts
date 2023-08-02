import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG_ORDER } from '@src/shared/api/constant';
import { GetFulfilledOrdersQuery } from '../application/queries/impl';
import { PlaceOrderCommand } from '../domain/commands/place-order.command';

@ApiTags(API_TAG_ORDER)
@Controller('api/v1/orders')
export class OrderController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) { }

  @Get()
  @HttpCode(200)
  async getFulfilledOrders() {
    return this.queryBus.execute(new GetFulfilledOrdersQuery());
  }

  @Post()
  @HttpCode(200)
  async place(command: PlaceOrderCommand) {
    await this.commandBus.execute(command);
  }
}
