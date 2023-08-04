import { AggregateRoot } from "@nestjs/cqrs";

export class BaseAggregateRoot extends AggregateRoot {
    constructor() {
        super();
        this.autoCommit = true;
    }

    addDomainEvent(event: any) {
        this.apply(event)
    }
}