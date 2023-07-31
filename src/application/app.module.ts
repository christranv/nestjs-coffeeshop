import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AppService } from './app.service';

@Module({
  imports: [InfrastructureModule],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
