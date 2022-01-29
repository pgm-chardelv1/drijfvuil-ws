import { Field, ObjectType } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'User ID' })
  id: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @Field(() => String, { description: 'User email' })
  email: string;

  @Column('varchar')
  @Field(() => String, { description: 'User password' })
  password: string;

  /**
   * Hash the password before inserting a user into the database
   */
  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
