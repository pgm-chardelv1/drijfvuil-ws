import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), FilesModule],
  providers: [ImagesService, ImagesResolver],
  exports: [ImagesService],
})
export class ImagesModule {}
