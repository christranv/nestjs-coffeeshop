import { Logger, Module, OnModuleDestroy } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule, EventBus, IEvent } from '@nestjs/cqrs';
import configuration from '@src/config/configuration';
import { validate } from 'class-validator';
import { Subject, takeUntil } from 'rxjs';
import { persistent } from './infrastructure/persistent/di';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate,
      expandVariables: true,
      cache: true,
    }),
    persistent,
    CqrsModule
  ],
  providers: [],
  exports: [ConfigModule, CqrsModule]
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
