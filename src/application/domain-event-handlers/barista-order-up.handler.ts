import { BaristaOrderUp } from "@/src/domain/barista/events/barista-order-up";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(BaristaOrderUp)
export class HeroKilledDragonHandler implements IEventHandler<BaristaOrderUp> {
    constructor() { }

    handle(event: BaristaOrderUp) {
        // Business logic
    }
}