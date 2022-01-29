import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from '../cities/cities.module';

import { City } from '../cities/entities/city.entity';
import { FilesModule } from '../files/files.module';
import { DbImage } from '../images/entities/image.entity';
import { ImagesModule } from '../images/images.module';
import { Quarter } from '../quarters/entities/quarter.entity';
import { QuartersModule } from '../quarters/quarters.module';
import { Report } from '../reports/entities/report.entity';
import { ReportsModule } from '../reports/reports.module';
import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    City,
    DbImage,
    Quarter,
    Report,
    User,
    CitiesModule,
    FilesModule,
    ImagesModule,
    QuartersModule,
    ReportsModule,
    UsersModule,
    TypeOrmModule.forFeature([City, DbImage, Quarter, Report, User]),
  ],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
