import { Order } from '@/src/domain/counter/order';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlaceOrderCommand } from '../../../domain/counter/commands/place-order.command';

@CommandHandler(PlaceOrderCommand)
export class PlaceOrderHandler implements ICommandHandler<PlaceOrderCommand> {
    constructor(
        private readonly publisher: EventPublisher,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async execute(command: PlaceOrderCommand) {
        if (!command) {
            throw new Error("Invalid ")
        }

        const order = Order.from(command);
        await this.orderRepository.insert(order);
    }
}
