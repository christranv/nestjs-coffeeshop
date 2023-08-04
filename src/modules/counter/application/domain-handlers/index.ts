import { OrderUpHandler } from "./order-up.handler";
import { OrderUpdateHandler } from "./order-update.handler";

export const DomainEventHandlers = [OrderUpdateHandler, OrderUpHandler];
