import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quarter } from './entities/quarter.entity';
import { QuartersService } from './quarters.service';
import { QuartersResolver } from './quarters.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Quarter])],
  providers: [QuartersService, QuartersResolver],
  exports: [QuartersService],
})
export class QuartersModule {}
