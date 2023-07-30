import { Module } from '@nestjs/common';
import { persistent } from './persistence/dependencyInjection';

@Module({
  imports: [persistent],
})
export class InfrastructureModule {}
