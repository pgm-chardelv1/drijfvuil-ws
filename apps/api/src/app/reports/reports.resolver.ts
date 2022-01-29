import { Logger, UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { GqlThrottlerGuard } from '../auth/guards/gql-throttler.guard';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequestWithUser } from '../auth/interfaces';
import { Quarter } from '../quarters/entities/quarter.entity';
import { City } from '../cities/entities/city.entity';
import { DbImage } from '../images/entities/image.entity';
import { GetReportsArgs } from './dto/get-reports.args';

@Resolver(() => Report)
export class ReportsResolver {
  constructor(private reportsService: ReportsService) {}

  /**
   * Get one report by ID
   * @param report ID
   * @returns one report with given ID
   */
  @Query(() => Report, { name: 'report' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reportsService.findOne(id);
  }

  /**
   * Get all reports
   * @returns all reports
   */
  @Query(() => [Report], { name: 'reports' })
  findAll(@Args() args: GetReportsArgs): Promise<Report[]> {
    if (args.cityId && args.quarterId) {
      return this.reportsService.findAllByCityAndQuarter(
        args.cityId,
        args.quarterId,
      );
    } else if (args.cityId) {
      return this.reportsService.findAllByCity(args.cityId);
    } else {
      return this.reportsService.findAll();
    }
  }

  /**
   * Create a new report
   * @param createReportInput
   * @returns the created report
   */
  @Mutation(() => Report)
  @UseGuards(GqlThrottlerGuard)
  createReport(
    @Args('createReportInput') createReportInput: CreateReportDto,
  ): Promise<Report> {
    return this.reportsService.create(createReportInput);
  }

  /**
   * Update a report
   * @param updateReportInput
   * @returns the updated report
   */
  @Mutation(() => Report)
  @UseGuards(GqlThrottlerGuard)
  updateReport(
    @Args('updateReportInput') updateReportInput: UpdateReportDto,
  ): Promise<Report> {
    return this.reportsService.update(updateReportInput.id, updateReportInput);
  }

  /**
   * Remove a report by ID
   * @param id report ID
   * @returns the deleted report
   */
  @Mutation(() => Report)
  @UseGuards(GqlAuthGuard)
  deleteReport(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: RequestWithUser },
  ): Promise<Report> {
    Logger.log(`Report #${id} deleted by: ${context.req.user.email}`);
    return this.reportsService.remove(id);
  }

  /**
   * Remove many reports by IDs
   * @param {*} {ids[]} report IDs
   * @returns the deleted report ids
   */
  @Mutation(() => Report)
  @UseGuards(GqlAuthGuard)
  deleteManyReports(
    @Args('ids', { type: () => [Int] }) ids: Array<number>,
    @Context() context: { req: RequestWithUser },
  ): Promise<Array<number>> {
    Logger.log(
      `Reports #${JSON.stringify(ids)} deleted by: ${context.req.user.email}`,
    );
    return this.reportsService.removeMany(ids);
  }

  @ResolveField(() => Quarter)
  quarter(@Parent() report: Report): Promise<Quarter> {
    return this.reportsService.getQuarter(report.quarterId);
  }

  @ResolveField(() => City)
  city(@Parent() report: Report): Promise<City> {
    return this.reportsService.getCity(report.cityId);
  }

  @ResolveField(() => DbImage)
  dbImage(@Parent() report: Report): Promise<DbImage> {
    return this.reportsService.getImage(report.dbImageId);
  }

  @Mutation(() => Report)
  handleFullCleanup(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Report> {
    return this.reportsService.handleFullCleanup(id);
  }
}
