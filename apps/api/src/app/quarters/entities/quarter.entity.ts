import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { City } from '../../cities/entities/city.entity';
import { Cleanup } from '../../cleanups/entities/cleanup.entity';
import { Image } from '../../images/entities/image.entity';
import { PolygonType } from './polygon.interface';
import { Report } from '../../reports/entities/report.entity';
/**
 * Define the Quarter entity
 * and GraphQL ObjectType
 *
 * @export Quarter
 * @class Quarter
 */
@Entity('quarter')
@ObjectType()
export class Quarter {
  /**
   * Main entity variables
   *
   * @type {number}
   * @memberof Quarter
   */
  @Column()
  @Field(() => Int, { description: 'City Postal code' })
  cityId: number;

  @PrimaryColumn()
  @Field(() => Int, { description: 'Quarter ID' })
  id: number;

  @Column('varchar')
  @Field(() => String, { description: 'Quarter name' })
  quarter: string;

  @Column('varchar', { array: true })
  @Field(() => [Number, Number], { description: 'Polygon for the quarter.' })
  polygon: PolygonType;

  /**
   * Relations with other entities
   *
   * @type {Report[]}
   * @memberof Quarter
   */
  @OneToMany(() => Report, (report) => report.quarter)
  @Field(() => [Report], {
    nullable: true,
    description: 'Reports in this quarter',
  })
  reports?: Report[];

  @OneToMany(() => Image, (image) => image.quarter, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => [Image], {
    nullable: true,
    description: 'Images in this quarter',
  })
  images?: Image[];

  @ManyToOne(() => City, (city) => city.quarters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @Field(() => City, {
    description: 'The city this quarter is in',
  })
  city: City;

  @OneToMany(() => Cleanup, (cleanup) => cleanup.quarter, {
    onUpdate: 'NO ACTION',
    onDelete: 'NO ACTION',
    orphanedRowAction: 'nullify',
  })
  @Field(() => [Cleanup], {
    nullable: true,
    description: 'Cleanups that took place in this quarter',
  })
  cleanups: Cleanup[];
}
