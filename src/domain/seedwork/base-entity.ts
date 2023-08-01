import { AggregateRoot } from "@nestjs/cqrs";

export class BaseAggregateRoot extends AggregateRoot {
    addDomainEvent(event: any) {
        this.apply(event)
    }
}