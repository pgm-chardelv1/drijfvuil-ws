import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitiesService } from '../cities/cities.service';
import { City } from '../cities/entities/city.entity';
import { Cleanup } from './entities/cleanup.entity';
import { CreateCleanupDto } from './dto/create-cleanup.dto';
import { Quarter } from '../quarters/entities/quarter.entity';
import { QuartersService } from '../quarters/quarters.service';
import { UpdateCleanupDto } from './dto/update-cleanup.dto';

/**
 * Main service for handling Cleanup objects
 *
 * @export CleanupsService
 * @class CleanupsService
 */
@Injectable()
export class CleanupsService {
  /**
   * Creates an instance of CleanupsService.
   * @param {Repository<Cleanup>} cleanupRepository
   * @param {CitiesService} citiesService
   * @param {QuartersService} quartersService
   * @memberof CleanupsService
   */
  constructor(
    @InjectRepository(Cleanup)
    private readonly cleanupRepository: Repository<Cleanup>,
    private readonly citiesService: CitiesService,
    private readonly quartersService: QuartersService,
  ) {}

  /**
   * Create a new Cleanup object
   *
   * @param {CreateCleanupDto} createCleanupDto
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsService
   */
  async create(createCleanupDto: CreateCleanupDto): Promise<Cleanup> {
    const cleanup = this.cleanupRepository.create(createCleanupDto);

    if (cleanup) {
      return this.cleanupRepository.save(cleanup);
    }

    throw new BadRequestException(`Cleanup could not be created`);
  }

  /**
   * Find all the Cleanup objects
   *
   * @return {*}  {Promise<Cleanup[]>}
   * @memberof CleanupsService
   */
  findAll(): Promise<Cleanup[]> {
    return this.cleanupRepository.find({
      relations: ['city', 'quarter'],
    });
  }

  findAllByCity(cityId: number): Promise<Cleanup[]> {
    return this.cleanupRepository.find({
      where: {
        cityId: cityId,
      },
    });
  }

  findAllByCityAndQuarter(
    cityId: number,
    quarterId: number,
  ): Promise<Cleanup[]> {
    return this.cleanupRepository.find({
      where: {
        cityId: cityId,
        quarterId: quarterId,
      },
    });
  }
  /**
   * Find one Cleanup object by {id}
   *
   * @param {number} id
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsService
   */
  async findOne(id: number): Promise<Cleanup> {
    const cleanup = this.cleanupRepository.findOne(id);
    if (cleanup) {
      this.cleanupRepository.findOne({ relations: ['city', 'quarter'] });
    }
    throw new NotFoundException(`Cleanup #${id} not found`);
  }

  /**
   * Update one Cleanup object by {id} and {updateCleanupInput}
   *
   * @param {number} id
   * @param {UpdateCleanupDto} updateCleanupDto
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsService
   */
  async update(
    id: number,
    updateCleanupDto: UpdateCleanupDto,
  ): Promise<Cleanup> {
    const cleanup = await this.cleanupRepository.preload({
      id: id,
      ...updateCleanupDto,
    });
    if (cleanup) {
      return this.cleanupRepository.save(cleanup);
    }
    throw new BadRequestException(`Update failed. Cleanup #${id} not found`);
  }

  /**
   * Delete one Cleanup object by {id}
   *
   * @param {number} id
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsService
   */
  async remove(id: number): Promise<Cleanup> {
    const cleanup = await this.cleanupRepository.findOne(id, {
      relations: ['city', 'quarter'],
    });
    await this.cleanupRepository.remove(cleanup);
    return cleanup;
  }

  /**
   * Resolver for City column
   *
   * @param {number} cityId
   * @return {*}  {Promise<City>}
   * @memberof CleanupsService
   */
  async getCity(cityId: number): Promise<City> {
    return await this.citiesService.findOne(cityId);
  }

  /**
   * Resolver for Quarter column
   *
   * @param {number} quarterId
   * @return {*}  {Promise<Quarter>}
   * @memberof CleanupsService
   */
  async getQuarter(quarterId: number): Promise<Quarter> {
    return await this.quartersService.findOne(quarterId);
  }
}
