import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { EventBus, IEvent } from '@nestjs/cqrs';
import { SharedModule } from '@src/shared/shared.module';
import { Subject, takeUntil } from 'rxjs';

@Module({
  imports: [SharedModule],
  providers: [],
})
export class KitchenModule implements OnModuleDestroy {
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
