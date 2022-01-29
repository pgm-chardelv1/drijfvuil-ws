import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly citiesRepository: Repository<City>,
  ) {}

  /**
   * Create a new city
   *
   * @param {CreateCityDto} createCityDto
   * @return {*}  {Promise<City>}
   * @memberof CitiesService
   */
  create(createCityDto: CreateCityDto): Promise<City> {
    const city = this.citiesRepository.create(createCityDto);
    if (!city) {
      throw new BadRequestException('City could not be created');
    }

    return this.citiesRepository.save(city);
  }

  /**
   * Find all cities
   *
   * @return {*} {Promise<City[]>}
   * @memberof CitiesService
   */
  findAll(): Promise<City[]> {
    return this.citiesRepository.find({
      relations: ['quarters'],
    });
  }

  /**
   * Find a city by its postal code
   *
   * @param {number} id
   * @return {*}  {Promise<City>}
   * @memberof CitiesService
   */
  async findOne(id: number): Promise<City> {
    const cityArr = await this.citiesRepository.find({
      where: {
        id: id,
      },
      take: 1,
      relations: ['quarters'],
    });

    const [city] = cityArr;

    if (!city) {
      throw new NotFoundException(
        `City with postal code #${id} could not be found!`,
      );
    }

    return city;
  }

  /**
   * Update a city by its postal code
   *
   * @param {number} id
   * @param {UpdateCityDto} updateCityDto
   * @return {*}  {Promise<City>}
   * @memberof CitiesService
   */
  async update(id: number, updateCityDto: UpdateCityDto): Promise<City> {
    const city = await this.citiesRepository.preload({
      id,
      ...updateCityDto,
    });

    if (!city) {
      throw new NotFoundException(`Update failed! City #${id} not found`);
    }

    return this.citiesRepository.save(city);
  }

  /**
   * Delete a city by its postal code
   *
   * @param {number} id (postal code)
   * @return {*}  {Promise<City>}
   * @memberof CitiesService
   */
  async remove(id: number): Promise<City> {
    const city = await this.citiesRepository.findOne(id);

    if (!city) {
      throw new BadRequestException(`Delete failed! City ${id} not found`);
    }

    await this.citiesRepository.remove(city);
    return city;
  }
}
