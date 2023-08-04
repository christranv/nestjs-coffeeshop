import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { BaristaController } from './api/barista.controller';
import { BaristaItem } from './domain/barista-item';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([BaristaItem])],
  controllers: [BaristaController]
})
export class BaristaModule {
}
