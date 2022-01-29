import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ImageUploadService } from './files.service';

@Controller('files')
export class ImageUploadController {
  constructor(private readonly imageUploadService: ImageUploadService) {}

  /**
   * Endpoint for uploading files
   * @param request
   * @example:
   * Headers: {
   *    Content-Type: multipart/form-data
   * },
   * Body: {
   *    upload: [File]
   * }
   * @returns:
   * {
   *    url: https://drijfvuil-public-bucket.s3.eu-central-1.amazonaws.com/1643028116177%20-%20ab90a7af-6cfb-4935-94f5-cd9f1a811ead.jpeg,
   *    key: 1643028117067 - ab90a7af-6cfb-4935-94f5-cd9f1a811ead.jpeg,
   *    id: 568a34c8-6ca0-4601-9e84-d06ea8dd767b
   * }
   */
  @Post('upload')
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      await this.imageUploadService.fileUpload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  /**
   * Get a presigned URL for a file on s3
   * @param request
   * @example:
   * body: {
   *    id: 1642798387341 - ab90a7af-6cfb-4935-94f5-cd9f1a811ead.jpeg
   * }
   * @param response
   * @returns https://drijfvuil-public-bucket.s3.eu-central-1.amazonaws.com/1642798387341%20-%20ab90a7af-6cfb-4935-94f5-cd9f1a811ead.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYBMFULX6OXTPMYQE%2F20220121%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20220121T211053Z&X-Amz-Expires=900&X-Amz-Signature=8435994fc0f7f17b330d25597c6c41ef3a0d3099592b3543404f33b0f53f573e&X-Amz-SignedHeaders=host
   */
  @Get()
  async getPresignedUrl(@Req() request: Request, @Res() response: Response) {
    const file = await this.imageUploadService.generatePresignedUrl(
      request.body.id,
    );
    return response.status(200).json(file);
  }
}
