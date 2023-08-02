import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@src/shared/shared.module';
import { BaristaItem } from './domain/barista-item';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([BaristaItem])],
  providers: [],
})
export class BaristaModule {
}
