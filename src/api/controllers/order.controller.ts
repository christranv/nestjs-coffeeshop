import { PlaceOrderCommand } from '@/src/domain/counter/commands/place-order.command';
import { Controller, HttpCode, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('orders')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) { }

  @Post()
  @HttpCode(200)
  async place(command: PlaceOrderCommand) {
    return this.commandBus.execute(command);
  }
}
