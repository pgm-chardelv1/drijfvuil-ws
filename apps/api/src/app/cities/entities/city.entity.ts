import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Cleanup } from '../../cleanups/entities/cleanup.entity';
import { Image } from '../../images/entities/image.entity';
import { Quarter } from '../../quarters/entities/quarter.entity';
import { Report } from '../../reports/entities/report.entity';

/**
 * Define the City TypeORM entity
 * and GraphQL ObjectType
 *
 * @export {City}
 * @class City
 */
@Entity('city')
@ObjectType()
export class City {
  /**
   * City ID = Postal code
   *
   * @type {number}
   * @memberof City
   */
  @PrimaryColumn()
  @Field(() => Int, { description: 'Postal code' })
  id: number;

  /**
   * City name
   *
   * @type {string}
   * @memberof City
   */
  @Column('varchar', { unique: true })
  @Field(() => String, { description: 'City name' })
  name: string;

  /**
   * City polygon JSON object
   *
   * @type {string}
   * @memberof City
   */
  @Column('varchar')
  @Field(() => String, {
    description: 'Polygon of latitude longitude expressions',
  })
  polygon: string;

  /**
   * Relation to Report entity
   *
   * @type {Report[]}
   * @memberof City
   */
  @OneToMany(() => Report, (report) => report.city)
  @Field(() => [Report], {
    nullable: true,
    description: 'Reports in this city',
  })
  reports?: Report[];

  /**
   * Relation to Quarter entity
   *
   * @type {Quarter[]}
   * @memberof City
   */
  @OneToMany(() => Quarter, (quarter) => quarter.city)
  @Field(() => [Quarter], {
    nullable: true,
    description: 'Quarters in this city',
  })
  quarters?: Quarter[];

  /**
   * Relation to Image entity
   *
   * @type {Image[]}
   * @memberof City
   */
  @OneToMany(() => Image, (image) => image.city)
  @Field(() => [Image], {
    nullable: true,
    description: 'Images in this city',
  })
  images?: Image[];

  /**
   * Relations to Cleanup entity
   *
   * @type {Cleanup[]}
   * @memberof City
   */
  @OneToMany(() => Cleanup, (cleanup) => cleanup.city)
  @Field(() => [Cleanup], {
    description: 'Cleanups that took place in this city',
    nullable: true,
  })
  cleanups?: Cleanup[];
}
