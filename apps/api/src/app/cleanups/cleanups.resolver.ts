import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GqlThrottlerGuard } from '../auth/guards/gql-throttler.guard';
import { City } from '../cities/entities/city.entity';
import { Quarter } from '../quarters/entities/quarter.entity';
import { CleanupsService } from './cleanups.service';
import { CreateCleanupDto } from './dto/create-cleanup.dto';
import { UpdateCleanupDto } from './dto/update-cleanup.dto';
import { Cleanup } from './entities/cleanup.entity';
import { GetCleanupsArgs } from './entities/get-cleanups.args';

/**
 * GraphQL resolver for handling Cleanup objects
 *
 * @export CleanupsResolver
 * @class CleanupsResolver
 */
@Resolver(() => Cleanup)
export class CleanupsResolver {
  /**
   * Creates an instance of CleanupsResolver.
   * @param {CleanupsService} cleanupsService
   * @memberof CleanupsResolver
   */
  constructor(private cleanupsService: CleanupsService) {}

  /**
   * Query for finding one Cleanup object by id
   *
   * @param {number} id
   * @return {*}
   * @memberof CleanupsResolver
   */
  @Query(() => Cleanup, { name: 'cleanup' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cleanupsService.findOne(id);
  }

  /**
   * Query for finding all Cleanup objects
   *
   * @return {*}  {Promise<Cleanup[]>}
   * @memberof CleanupsResolver
   */
  @Query(() => [Cleanup], { name: 'cleanups' })
  findAll(@Args() args: GetCleanupsArgs): Promise<Cleanup[]> {
    if (args.cityId && args.quarterId) {
      return this.cleanupsService.findAllByCityAndQuarter(
        args.cityId,
        args.quarterId,
      );
    } else if (args.cityId) {
      return this.cleanupsService.findAllByCity(args.cityId);
    } else {
      return this.cleanupsService.findAll();
    }
  }

  /**
   * Mutation for creating a new Cleanup object
   *
   * @param {CreateCleanupDto} createCleanupInput
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsResolver
   */
  @Mutation(() => Cleanup)
  @UseGuards(GqlThrottlerGuard)
  createCleanup(
    @Args('createCleanupInput') createCleanupInput: CreateCleanupDto,
  ): Promise<Cleanup> {
    return this.cleanupsService.create(createCleanupInput);
  }

  /**
   * Mutation for updating an existing Cleanup object
   *
   * @param {UpdateCleanupDto} updateCleanupInput
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsResolver
   */
  @Mutation(() => Cleanup)
  @UseGuards(GqlAuthGuard)
  updateCleanup(
    @Args('updateCleanupInput') updateCleanupInput: UpdateCleanupDto,
  ): Promise<Cleanup> {
    return this.cleanupsService.update(
      updateCleanupInput.id,
      updateCleanupInput,
    );
  }

  /**
   * Mutation for deleting an existing Cleanup object
   *
   * @param {number} id
   * @return {*}  {Promise<Cleanup>}
   * @memberof CleanupsResolver
   */
  @Mutation(() => Cleanup)
  @UseGuards(GqlAuthGuard)
  deleteCleanup(@Args('id', { type: () => Int }) id: number): Promise<Cleanup> {
    return this.cleanupsService.remove(id);
  }

  /**
   * Resolves the City column on a Cleanup object
   *
   * @param {Cleanup} cleanup
   * @return {*}  {Promise<City>}
   * @memberof CleanupsResolver
   */
  @ResolveField(() => City)
  city(@Parent() cleanup: Cleanup): Promise<City> {
    return this.cleanupsService.getCity(cleanup.cityId);
  }

  /**
   * Resolves the Quarter column of a Cleanup object
   *
   * @param {Cleanup} cleanup
   * @return {*}  {Promise<Quarter>}
   * @memberof CleanupsResolver
   */
  @ResolveField(() => Quarter)
  quarter(@Parent() cleanup: Cleanup): Promise<Quarter> {
    return this.cleanupsService.getQuarter(cleanup.quarterId);
  }
}
