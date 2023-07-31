import { DateTimeHelper } from "../base/helpers/datetime-helper";

interface IDomainEvent {
  createdAt: Date;
  metadata: Map<string, object>;
}

export abstract class BaseEvent implements IDomainEvent {
  // protected eventType;
  // public EventType:string => construct;
  createdAt: Date = DateTimeHelper.UTCNow;
  metadata: Map<string, object> = new Map<string, object>();
}

class EventWrapper {
  public readonly event: IDomainEvent;

  constructor(event: IDomainEvent) {
    this.event = event;
  }
}
