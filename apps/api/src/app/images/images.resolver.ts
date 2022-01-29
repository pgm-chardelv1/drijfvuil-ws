import { Logger, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequestWithUser } from '../auth/interfaces';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private imagesService: ImagesService) {}

  /**
   * Get one image by ID
   * @param id {string}
   * @returns {Promise<Image>}
   * @memberof ImagesResolver
   */
  @Query(() => Image, { name: 'image' })
  findOne(@Args('id', ParseUUIDPipe) id: string): Promise<Image> {
    return this.imagesService.findOne(id);
  }

  /**
   * Get all images
   * @returns {Promise<Image[]>}
   * @memberof ImagesResolver
   */
  @Query(() => [Image], { name: 'images' })
  findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  /**
   * Create a new image
   * @param createImageInput
   * @returns {Promise<Image>}
   * @memberof ImagesResolver
   */
  @Mutation(() => Image)
  // @UseGuards(GqlAuthGuard)
  createImage(@Args('createImageInput') createImageInput: CreateImageDto): Promise<Image> {
    Logger.log(`Image ${createImageInput.key}`);
    return this.imagesService.create(createImageInput);
  }

  /**
   * Update an image
   * @param updateImageInput
   * @returns the updated image
   * @memberof ImagesResolver
   */
  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<Image> {
    Logger.log(`Image #${updateImageInput.id} updated by: ${context.req.user.email}`);
    return this.imagesService.update(updateImageInput.id, updateImageInput);
  }

  /**
   * Remove an image
   * @param id image ID
   * @returns the removed image
   * @memberof ImagesResolver
   */
  @Mutation(() => Image)
  @UseGuards(GqlAuthGuard)
  deleteImage(
    @Args('id') id: string,
    @Context() context: { req: RequestWithUser },
  ): Promise<Image> {
    Logger.log(`Image #${id} deleted by: ${context.req.user.email}`);
    return this.imagesService.remove(id);
  }

  /**
   * Get a presigned URL for an image
   *
   * @param {UpdateImageDto} updateImageInput
   * @return {*}  {Promise<Image>}
   * @memberof ImagesResolver
   */
  @Mutation(() => Image)
  getPresignedImageUrl(@Args('updateImageInput') updateImageInput: UpdateImageDto): Promise<Image> {
    return this.imagesService.getPresignedImageUrl(updateImageInput);
  }
}
