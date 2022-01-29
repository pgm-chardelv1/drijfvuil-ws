import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageUploadService } from '../files/files.service';
import { Report } from '../reports/entities/report.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { DbImage } from './entities/image.entity';

@Injectable()
/**
 * Provider for handling image resources
 */
export class ImagesService {
  constructor(
    @InjectRepository(DbImage)
    private readonly imageRepository: Repository<DbImage>,
    private readonly filesService: ImageUploadService,
  ) {}

  /**
   * Create a new image
   * @param createImageDto defines the input for creating a new image
   * @returns the created image
   */
  create(createImageDto: CreateImageDto): Promise<DbImage> {
    const image = this.imageRepository.create(createImageDto);

    if (!image) {
      throw new BadRequestException(
        `Create failed! Image could not be created`,
      );
    }

    return this.imageRepository.save(image);
  }

  /**
   * Get all images
   * @returns all images
   */
  findAll(): Promise<DbImage[]> {
    return this.imageRepository.find({ relations: ['report'] });
  }

  /**
   * Get one image by given ID
   * @param id image id
   * @returns image with the given ID
   */
  findOne(id: string): Promise<DbImage> {
    const image = this.imageRepository.findOne(id);

    if (!image) {
      throw new NotFoundException(`Query failed! Image #${id} not found`);
    }

    return this.imageRepository.findOneOrFail(id, { relations: ['report'] });
  }

  /**
   * Update an image by given ID
   * @param id image id
   * @param updateImageDto the updated input for the image
   * @returns updated image
   */
  async update(id: string, updateImageDto: UpdateImageDto): Promise<DbImage> {
    const image = await this.imageRepository.preload({
      id: id,
      ...updateImageDto,
    });

    if (!image) {
      throw new BadRequestException(`Update failed! Image #${id} not found`);
    }

    return this.imageRepository.save(image);
  }

  /**
   * Remove one image by ID
   * @param id image uuid
   * @returns the removed image
   */
  async remove(id: string): Promise<DbImage> {
    const image = await this.imageRepository.findOne(id);

    if (!image) {
      throw new BadRequestException(`Delete failed! Image #${id} not found`);
    }
    await this.filesService.deleteFile(image.key);
    await this.imageRepository.remove(image);
    return image;
  }

  async addReport(id: string, report: Report): Promise<DbImage> {
    const image = await this.imageRepository.findOneOrFail(id);
    image.report = report;
    return this.imageRepository.save(image);
  }

  async getPresignedImageUrl(
    updateImageInput: UpdateImageDto,
  ): Promise<DbImage> {
    try {
      const image = await this.imageRepository.findOneOrFail(
        updateImageInput.id,
      );
      const presignedUrl = await this.filesService.generatePresignedUrl(
        image.key,
      );
      if (!presignedUrl)
        throw new InternalServerErrorException(
          `Something went wrong while generating a presigned URL for image ${image.key}`,
        );
      image.url = presignedUrl;
      console.info('A user requested access to a presigned image: ', image.key);
      return image;
    } catch (err) {
      Logger.log(`Failed to generate presigned URL for the image`);
    }
  }
}
