import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from '../cities/cities.module';
import { QuartersModule } from '../quarters/quarters.module';
import { CleanupsResolver } from './cleanups.resolver';
import { CleanupsService } from './cleanups.service';
import { Cleanup } from './entities/cleanup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cleanup]), CitiesModule, QuartersModule],
  providers: [CleanupsService, CleanupsResolver],
  exports: [CleanupsService],
})
export class CleanupsModule {}
