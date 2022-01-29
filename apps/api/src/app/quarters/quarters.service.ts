import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuarterDto } from './dto/create-quarter.dto';
import { UpdateQuarterDto } from './dto/update-quarter.dto';
import { Quarter } from './entities/quarter.entity';

@Injectable()
/**
 * Provider for handling the quarter resource
 */
export class QuartersService {
  constructor(
    @InjectRepository(Quarter)
    private readonly quarterRepository: Repository<Quarter>,
  ) {}

  /**
   * Create a new quarter
   * @param createQuarterDto defines the input for creating a new quarter
   * @returns the created quarter
   */
  create(createQuarterDto: CreateQuarterDto): Promise<Quarter> {
    const quarter = this.quarterRepository.create(createQuarterDto);

    if (!quarter) {
      throw new BadRequestException(`Quarter could not be created`);
    }

    return this.quarterRepository.save(quarter);
  }

  /**
   * Get all quarters
   * @returns all quarters
   */
  findAll(): Promise<Quarter[]> {
    return this.quarterRepository.find({
      relations: ['city'],
    });
  }

  /**
   * Get one quarter with ID
   * @param id quarter ID
   * @returns one quarter with given ID
   */
  findOne(id: number): Promise<Quarter> {
    const quarter = this.quarterRepository.findOne(id);

    if (!quarter) {
      throw new NotFoundException(`Quarter #${id} not found`);
    }
    return this.quarterRepository.findOneOrFail(id, {
      relations: ['city'],
    });
  }

  /**
   * Update a quarter by ID
   * @param id quarter ID
   * @param updateQuarterDto the updated input for the quarter
   * @returns updated quarter
   */
  async update(
    id: number,
    updateQuarterDto: UpdateQuarterDto,
  ): Promise<Quarter> {
    const quarter = await this.quarterRepository.preload({
      id,
      ...updateQuarterDto,
    });

    if (!quarter) {
      throw new NotFoundException(`Quarter #${id} not found`);
    }

    return this.quarterRepository.save(quarter);
  }

  /**
   * Remove one quarter by ID
   * @param id quarter ID
   * @returns the removed quarter
   */
  async remove(id: number): Promise<Quarter> {
    const quarter = await this.quarterRepository.findOne(id);
    await this.quarterRepository.remove(quarter);
    return quarter;
  }
}
