import { Logger } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { OrderUpdate } from "../../domain/events/order-update";

@EventsHandler(OrderUpdate)
export class OrderUpdateHandler implements IEventHandler<OrderUpdate> {
    async handle(event: OrderUpdate): Promise<void> {
        const message = `${event.orderId} ${event.itemLineId} ${event.orderStatus} ${event.madeBy}`;
        Logger.log(`Order update event: ${message}`)
    }
}