import { Controller, Get } from '@nestjs/common';
import { SeederService } from './seeder.service';

/**
 * Seeder controller
 * Generates an endpoint that handles seeding
 * Can only be used if the database is empty
 * Otherwise it will throw Unique Violation errors
 * Maps to ./seeder/seed
 *
 * @export SeederController
 * @class SeederController
 */
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  /**
   * The API endpoint for sending a seed request
   *
   * @return {*}  {Promise<{ message: string; success: boolean }>}
   * @memberof SeederController
   */
  @Get('seed')
  async seed(): Promise<{ message: string; success: boolean }> {
    try {
      return await this.seederService.seed();
    } catch (err) {
      return err;
    }
  }
}
