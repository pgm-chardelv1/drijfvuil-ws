import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitiesService } from '../cities/cities.service';
import { CleanupsService } from '../cleanups/cleanups.service';
import { CreateCleanupDto } from '../cleanups/dto/create-cleanup.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ImagesService } from '../images/images.service';
import { QuartersService } from '../quarters/quarters.service';
import { UpdateReportDto } from './dto/update-report.dto';

import { City } from '../cities/entities/city.entity';
import { DbImage } from '../images/entities/image.entity';
import { Quarter } from '../quarters/entities/quarter.entity';
import { Report } from './entities/report.entity';

@Injectable()
/**
 * Provider for handling the report resource
 */
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly citiesService: CitiesService,
    private readonly cleanupsService: CleanupsService,
    private readonly imagesService: ImagesService,
    private readonly quartersService: QuartersService,
  ) {}

  /**
   * Create a report
   * @param createReportDto defines the input for creating a new report
   * @returns the created report
   */
  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create(createReportDto);

    if (!report) {
      throw new BadRequestException(`Report could not be created`);
    }
    return this.reportRepository.save(report);
  }

  /**
   * Get all reports
   * @returns all reports
   */
  findAll(): Promise<Report[]> {
    return this.reportRepository.find({
      relations: ['city', 'quarter', 'dbImage'],
    });
  }

  findAllByCity(cityId: number): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        cityId: cityId,
      },
    });
  }

  findAllByCityAndQuarter(
    cityId: number,
    quarterId: number,
  ): Promise<Report[]> {
    return this.reportRepository.find({
      where: {
        cityId: cityId,
        quarterId: quarterId,
      },
      relations: ['dbImage'],
    });
  }

  async findOne(id: number): Promise<Report> {
    const report = this.reportRepository.findOne(id);
    if (!report) {
      throw new NotFoundException(`Report #${id} could not be found`);
    }
    return this.reportRepository.findOneOrFail(id, {
      relations: ['city', 'quarter', 'dbImage'],
    });
  }

  /**
   * Update a report by ID
   * @param id the id number for the report
   * @param updateReportDto the updated input for the report
   * @returns updated report
   */
  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.reportRepository.preload({
      id: id,
      ...updateReportDto,
    });

    if (!report) {
      throw new NotFoundException(`Update failed. Report #${id} not found`);
    }
    return this.reportRepository.save(report);
  }

  /**
   * Remove a report by ID
   * @param id report ID
   * @returns the removed report
   */
  async remove(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne(id, {
      relations: ['city', 'quarter', 'dbImage'],
    });
    await this.reportRepository.remove(report);
    return report;
  }

  /**
   * Remove many reports by IDs
   * @param ids report IDs array
   * @returns the ids of the removed reports
   */
  async removeMany(ids: number[]): Promise<Array<number>> {
    let removedIds: Array<number>;
    ids.forEach(async (id) => {
      const report = await this.reportRepository.findOne(id, {
        relations: ['city', 'dbImage', 'quarter'],
      });
      await this.reportRepository.remove(report);
      removedIds.push(report.id);
    });
    return removedIds;
  }

  /**
   * Find the city for the report
   * @param {number} cityId
   * @return {*}  {Promise<City>}
   * @memberof ReportsService
   */
  async getCity(cityId: number): Promise<City> {
    return await this.citiesService.findOne(cityId);
  }

  /**
   * Find the quarter for the report
   * @param {number} quarterId
   * @return {*}  {Promise<Quarter>}
   * @memberof ReportsService
   */
  async getQuarter(quarterId: number): Promise<Quarter> {
    return await this.quartersService.findOne(quarterId);
  }

  /**
   * Find the image for the report
   * @param imageId
   * @returns {*} {Promise<Image>}
   * @memberof ReportsService
   */
  async getImage(imageId: string): Promise<DbImage> {
    return await this.imagesService.findOne(imageId);
  }

  async handleFullCleanup(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      relations: ['quarter', 'city'],
    });
    if (report) {
      const createCleanupInput: CreateCleanupDto = {
        reportId: report.id,
        type: 'full',
        location: report.latLngTuple,
        cityId: report.cityId,
        quarterId: report.quarterId,
      };
      const cleanup = await this.cleanupsService.create(createCleanupInput);
      if (cleanup) {
        const imgDeleted = await this.imagesService.remove(report.dbImageId);
        if (imgDeleted) {
          const deletedReport = await this.reportRepository.remove(report);
          return deletedReport;
        }
      }
    }

    throw new NotFoundException(
      `Cleanup handling failed. Could not find report #${id}.`,
    );
  }
}
