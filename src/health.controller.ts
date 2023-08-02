import { Controller, Get } from '@nestjs/common';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckService,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private disk: DiskHealthIndicator,
        private db: TypeOrmHealthIndicator,
    ) { }

    @Get()
    @HealthCheck()
    check() {
        return this.health.check(
            [() =>
                this.disk.checkStorage('disk health', {
                    thresholdPercent: 0.5,
                    path: '/',
                })
                , async () => this.db.pingCheck('typeorm')
            ]
        );
    }
}