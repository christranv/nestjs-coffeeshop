import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import BaseController from '@src/shared/api/base-controller';
import { API_TAG_ORDER } from '@src/shared/api/constant';
import { GetFulfilledOrdersQuery } from '../application/queries/impl';
import { PlaceOrderCommand } from '../domain/commands/place-order.command';

@ApiTags(API_TAG_ORDER)
@Controller('api/v1/orders')
export class OrderController extends BaseController {

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
    super();
  }

  @Get()
  async getFulfilledOrders() {
    return await this.queryBus.execute(new GetFulfilledOrdersQuery);
  }

  @Post()
  async place(@Body() command: PlaceOrderCommand) {
    await this.commandBus.execute(command);
  }

  @Get("test")
  async test() {
    return "OK";
  }
}
