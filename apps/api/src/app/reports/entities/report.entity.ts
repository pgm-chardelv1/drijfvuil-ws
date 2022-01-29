import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Quarter } from '../../quarters/entities/quarter.entity';
import { Image } from '../../images/entities/image.entity';

/**
 * Defines the Report TypeOrm entity
 * and GraphQL ObjectType
 *
 * @export Report
 * @class Report
 */
@Entity('report')
@ObjectType()
export class Report {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Report ID' })
  id: number;

  @CreateDateColumn()
  @Field(() => Date, { description: 'Report created at [DATE]' })
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date, { description: 'Report updated at [DATE]' })
  updatedAt: Date;

  @Column('float', { array: true })
  @Field(() => [Number, Number], {
    description:
      'Latitude and longitude of the report as a latitude longitude tuple. Example: [51.11321,16.18646]',
  })
  latLngTuple: [number, number];

  /**
   * Relation to city entity
   * Many reports can be created for one city
   * Field for cityId (postal code)
   * @type {City}
   * @memberof Report
   */
  @Column()
  @Field(() => Int, {
    description: 'The postal code for the city the report is made in',
  })
  cityId: number;

  @ManyToOne(() => City, (city) => city.reports, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => City, { description: 'The city the report was made in' })
  city: City;

  /**
   * Relations to quarter entity
   * Many reports can be created for one quarter
   * Field for quarterId (quarter.id)
   * @type {Quarter}
   * @memberof Report
   */
  @Column()
  @Field(() => Int, {
    description: 'ID for the quarter the report is made in',
    nullable: true,
  })
  quarterId?: number;

  @ManyToOne(() => Quarter, (quarter) => quarter.reports)
  @Field(() => Quarter, {
    description: 'The quarter the report was made in',
    nullable: true,
  })
  quarter?: Quarter;

  /**
   * Relations to image entity
   * One report can have zero or one image
   * @type {Image}
   * @memberof Report
   */
  @OneToOne(() => Image, (image) => image.report, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @Field(() => Image, {
    description: 'Image for this report',
    nullable: true,
  })
  @JoinColumn()
  image?: Image;

  @Column()
  @Field(() => String, {
    description: 'ID for the image',
    nullable: true,
  })
  imageId?: string;

  @Column()
  @Field(() => String, {
    description: 'Extra information for the report',
    nullable: true,
  })
  extra?: string;

  @Column()
  @Field(() => String, {
    description: 'Is this report for litter in the water or on land?',
    defaultValue: 'water',
  })
  locationType: 'water' | 'land';

  @Column()
  @Field(() => String, {
    description: 'Type of litter report is for',
    nullable: true,
  })
  litterType?: string;
}
