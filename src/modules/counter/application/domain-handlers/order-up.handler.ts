import { EventPublisher, EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderUp } from "@src/shared/domain/events/order-up";
import { DomainException } from "@src/shared/domain/exceptions/domain.exception";
import { Repository } from "typeorm";
import { Order } from "../../domain/order";

@EventsHandler(OrderUp)
export class OrderUpHandler implements IEventHandler<OrderUp> {

    constructor(
        private readonly publisher: EventPublisher,
        @InjectRepository(Order)
        private readonly repository: Repository<Order>
    ) { }

    async handle(event: OrderUp): Promise<void> {
        let order = await this.repository.findOneBy({ id: event.orderId })
        if (!order) throw new DomainException("Order not found!")

        order = this.publisher.mergeObjectContext(order)
        order.applyOrder(event);
        await this.repository.save(order);
        order.commit()
    }
}