import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaceOrderCommand } from '@src/modules/counter/domain/commands/place-order.command';
import { Order } from '@src/modules/counter/domain/order';
import { Repository } from 'typeorm';

@CommandHandler(PlaceOrderCommand)
export class PlaceOrderHandler implements ICommandHandler<PlaceOrderCommand> {
    constructor(
        private readonly publisher: EventPublisher,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async execute(command: PlaceOrderCommand) {
        if (!command) {
            throw new Error("Invalid")
        }

        const order = Order.from(command);
        await this.orderRepository.insert(order);
    }
}
