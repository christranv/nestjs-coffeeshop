import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler implements IEventHandler<HeroKilledDragonEvent> {
    constructor() { }

    handle(event: HeroKilledDragonEvent) {
        // Business logic
    }
}