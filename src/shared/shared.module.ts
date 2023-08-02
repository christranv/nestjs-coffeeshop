import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { CqrsModule, EventBus, IEvent } from '@nestjs/cqrs';
import { Subject, takeUntil } from 'rxjs';
import { persistent } from './infrastructure/persistent/di';

@Module({
  imports: [persistent, CqrsModule],
  providers: [],
})
export class SharedModule implements OnModuleDestroy {
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
