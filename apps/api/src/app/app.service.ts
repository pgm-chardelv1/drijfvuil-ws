import { Injectable } from '@nestjs/common';

/**
 * The main App service
 * Shows JSON with some relevant info and links
 *
 * @export AppService
 * @class AppService
 */
@Injectable()
export class AppService {
  /**
   * Get and return app info
   *
   * @return {*}  {{
   *     message: string;
   *     link: string;
   *     info: {
   *       endpoints: {
   *         link: string;
   *         type: string;
   *       }[];
   *     };
   *   }}
   * @memberof AppService
   */
  getData(): {
    message: string;
    link: string;
    info: {
      endpoints: {
        link: string;
        type: string;
      }[];
    };
  } {
    return {
      message: `🚀 Welcome to the Drijfvuil api. This API is managed by GraphQL. You can test it out by visiting the link provided!`,
      link: 'https://drijfvuil-api.onrender.com/graphql',
      info: {
        endpoints: [
          {
            link: 'https://drijfvuil-api.onrender.com/seeder/seed',
            type: '🌱 Seed the DB; Only works if the DB is empty!',
          },
          {
            link: 'https://drijfvuil-api.onrender.com/??',
            type: '🤖 Upload images to S3; see documentation for actual endpoint or ask a friendly backend developer.',
          },
        ],
      },
    };
  }
}
