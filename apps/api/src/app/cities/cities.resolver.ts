import { Logger, UseGuards } from '@nestjs/common';
import { Args, Int, Query, Mutation, Resolver, Context } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RequestWithUser } from '../auth/interfaces';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';

@Resolver(() => City)
export class CitiesResolver {
  constructor(private citiesService: CitiesService) {}

  /**
   * Query one city by its postal code
   *
   * @param {number} id
   * @return {*}  {Promise<City>}
   * @memberof CitiesResolver
   */
  @Query(() => City, { name: 'city' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<City> {
    return this.citiesService.findOne(id);
  }

  /**
   * Query all cities
   *
   * @return {*}  {Promise<City[]>}
   * @memberof CitiesResolver
   */
  @Query(() => [City], { name: 'cities' })
  findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  /**
   * Mutation to create a new city
   *
   * @param {CreateCityDto} createCityInput
   * @return {*}  {Promise<City>}
   * @memberof CitiesResolver
   */
  @Mutation(() => City)
  @UseGuards(GqlAuthGuard)
  createCity(
    @Args('createCityInput') createCityInput: CreateCityDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<City> {
    Logger.log(
      `City #${createCityInput.id} created by: ${context.req.user.email}`,
    );
    return this.citiesService.create(createCityInput);
  }

  /**
   * Mutation to update a city by its postal code
   *
   * @param {UpdateCityDto} updateCityInput
   * @return {*}  {Promise<City>}
   * @memberof CitiesResolver
   */
  @Mutation(() => City)
  @UseGuards(GqlAuthGuard)
  updateCity(
    @Args('updateCityInput') updateCityInput: UpdateCityDto,
    @Context() context: { req: RequestWithUser },
  ): Promise<City> {
    Logger.log(
      `City #${updateCityInput.id} updated by: ${context.req.user.email}`,
    );
    return this.citiesService.update(updateCityInput.id, updateCityInput);
  }

  /**
   * Mutation to delete a city by its postal code
   *
   * @param {number} id
   * @return {*}  {Promise<City>}
   * @memberof CitiesResolver
   */
  @Mutation(() => City)
  @UseGuards(GqlAuthGuard)
  deleteCity(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: { req: RequestWithUser },
  ): Promise<City> {
    Logger.log(`City #${id} deleted by: ${context.req.user.email}`);
    return this.citiesService.remove(id);
  }
}
