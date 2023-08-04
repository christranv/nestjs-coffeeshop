import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderUp } from "@src/shared/domain/events/order-up";
import { DomainException } from "@src/shared/domain/exceptions/domain.exception";
import { Repository } from "typeorm";
import { Order } from "../../domain/order";

@EventsHandler(OrderUp)
export class OrderUpHandler implements IEventHandler<OrderUp> {

    constructor(
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ) { }

    async handle(event: OrderUp): Promise<void> {
        const order = await this.repository.findOneBy({ id: event.orderId });

        if (!order) throw new DomainException("Order not found!")

        const orderUpdated = order.applyOrder(event);
        await this.repository.save(orderUpdated);
    }
}