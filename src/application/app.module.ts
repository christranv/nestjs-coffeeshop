import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { CqrsModule, EventBus, IEvent } from '@nestjs/cqrs';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AppService } from './app.service';
import { CommandHandlers } from './commands/handlers';
import { DomainEventHandlers } from './domain-event-handlers';
import { QueryHandlers } from './queries/handlers';
import { Subject, takeUntil } from 'rxjs';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers, ...DomainEventHandlers],
  exports: [AppService]
})
export class AppModule implements OnModuleDestroy {
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
