import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesResolver } from './cities.resolver';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CitiesService, CitiesResolver],
  exports: [CitiesService],
})
export class CitiesModule {}
