import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ImageUploadController } from './files.controller';
import { ImageUploadService } from './files.service';

@Module({
  imports: [ConfigModule],
  controllers: [ImageUploadController],
  providers: [ImageUploadService],
  exports: [ImageUploadService],
})
export class FilesModule {}
