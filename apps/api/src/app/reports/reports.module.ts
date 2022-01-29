import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Report } from './entities/report.entity';
import { ReportsResolver } from './reports.resolver';
import { ReportsService } from './reports.service';

import { CitiesModule } from '../cities/cities.module';
import { FilesModule } from '../files/files.module';
import { ImagesModule } from '../images/images.module';
import { QuartersModule } from '../quarters/quarters.module';
import { CleanupsModule } from '../cleanups/cleanups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    CitiesModule,
    CleanupsModule,
    FilesModule,
    ImagesModule,
    QuartersModule,
  ],
  providers: [ReportsResolver, ReportsService],
  exports: [ReportsService],
})
export class ReportsModule {}
