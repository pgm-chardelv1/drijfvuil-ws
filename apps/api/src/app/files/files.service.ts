import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as multer from 'multer';
import { S3 } from 'aws-sdk';
import * as multerS3 from 'multer-s3';

/**
 * Initialize a new S3 client configuration
 *
 * @type {S3}
 * */
const s3: S3 = new S3();

@Injectable()
export class ImageUploadService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Upload a file as multipart form data
   * Response: Promise<Image>
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof ImageUploadService
   */
  async fileUpload(@Req() req: Request, @Res() res: Response): Promise<Response> {
    try {
      this.upload(req, res, async (error) => {
        const mimeType: string = req?.files[0]?.mimetype;
        // Check if the file has the correct mimetype, starting with image
        if (mimeType && mimeType.toString().startsWith('image')) {
          if (error) {
            return res.status(404).json(`Failed to upload image file: ${error}`);
          }
          const img = {
            message: `Successfully uploaded the image! Be sure to create an image in the DB.`,
            url: req.files[0].location,
            key: `${req.files[0].originalname}`,
          };
          // Return HTTP code 201: Created
          return res.status(201).json(img);
        } else {
          // Return HTTP code 415: Unsupported Media Type
          return res
            .status(415)
            .json(`Upload failed. File is not an image or file size exceeds 5MB.`);
        }
      });
    } catch (error) {
      // Return HTTP code 500: Internal server error
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  maxSize = 5 * 1000 * 1000;

  /**
   * Upload a file to the Amazon S3 Bucket
   *
   * @memberof ImageUploadService
   */
  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      key: function (req, file, cb) {
        cb(null, `${file.originalname}`);
      },
    }),
    limits: {
      fileSize: this.maxSize,
    },
  }).array('upload', 1);

  /**
   * Delete a file from the Amazon S3 bucket
   *
   * @param {string} key
   * @memberof ImageUploadService
   */
  async deleteFile(key: string) {
    s3.deleteObject(
      {
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      },
      (err, data) => {
        if (err) console.error(err);
        if (data) console.info(data);
        return data;
      },
    );
  }

  /**
   * Generate a presigned URL for displaying a private image from
   * Amazon S3
   *
   * @param {string} key
   * @return {*} the presigned URL
   * @memberof ImageUploadService
   */
  async generatePresignedUrl(key: string) {
    return s3.getSignedUrlPromise('getObject', {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: key,
    });
  }
}
