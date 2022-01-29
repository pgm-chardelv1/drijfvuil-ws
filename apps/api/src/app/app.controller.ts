import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * The main app controller
 * Sends back some basic application info
 *
 * @export
 * @class AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  /**
   * Get App info
   *
   * @return {*} {JSON}
   * @memberof AppController
   */
  @Get()
  getData() {
    return this.appService.getData();
  }
}
