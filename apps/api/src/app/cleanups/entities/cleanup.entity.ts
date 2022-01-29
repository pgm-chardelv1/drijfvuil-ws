import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Quarter } from '../../quarters/entities/quarter.entity';

/**
 * Define the Cleanup entity
 * and GraphQL ObjectType
 * Cleanup consists of a fully handled report
 *
 * @export
 * @class Cleanup
 */
@Entity('cleanup')
@ObjectType()
export class Cleanup {
  /**
   * Main object variables
   *
   * @type {number}
   * @memberof Cleanup
   */
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Cleanup ID' })
  id: number;

  @CreateDateColumn()
  @Field(() => Date, { description: 'Cleanup created at [DATE]' })
  createdAt: Date;

  @Column('int8')
  @Field(() => Int, { description: 'Report ID' })
  reportId: number;

  @Column()
  @Field(() => String, { description: 'Cleanup type? Partial? Full?' })
  type: string;

  @Column('float', { array: true })
  @Field(() => [Number, Number], { description: 'Cleanup location' })
  location: [number, number];

  @Column()
  @Field(() => Int, { description: 'City ID where cleanup took place' })
  cityId: number;

  @Column()
  @Field(() => Int, {
    description: 'Quarter ID where cleanup took place',
    nullable: true,
  })
  quarterId?: number;

  /**
   * Relations to cities
   * @type {City}
   * @memberof Cleanup
   */
  @ManyToOne(() => City, (city) => city.cleanups)
  @Field(() => City, {
    description: 'City where cleanup took place',
  })
  city: City;

  /**
   * Relations to quarters
   * @type {Quarter}
   * @memberof Cleanup
   */
  @ManyToOne(() => Quarter, (quarter) => quarter.cleanups)
  @Field(() => Quarter, {
    description: 'Quarter where cleanup took place',
    nullable: true,
  })
  quarter?: Quarter;
}
