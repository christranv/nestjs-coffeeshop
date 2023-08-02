import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { CqrsModule, EventBus, IEvent } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';
import { CommandHandlers } from '../counter/application/commands/handlers';
import { DomainEventHandlers } from '../counter/application/domain-event-handlers';
import { QueryHandlers } from '../counter/application/queries/handlers';

@Module({
  imports: [CqrsModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...DomainEventHandlers],
})
export class BaristaModule implements OnModuleDestroy {
  private destroy$ = new Subject<void>();

  constructor(private eventBus: EventBus) {
    this.eventBus
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: IEvent) => {
        Logger.debug("Processing event")
        Logger.debug(event)
      });
  }

  onModuleDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
