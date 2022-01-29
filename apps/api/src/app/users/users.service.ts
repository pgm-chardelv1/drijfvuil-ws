import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user
   *
   * @param {CreateUserDto} createUserDto
   * @return {*} {Promise<User>}
   * @memberof UsersService
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    if (!user) {
      throw new BadRequestException(`User could not be created`);
    }

    return this.userRepository.save(user);
  }

  /**
   * Find all users
   *
   * @return {*} {Promise<User[]>}
   * @memberof UsersService
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Find one user by ID (uuid)
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UsersService
   */
  findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException(`Query failed! User #${id} not found`);
    }

    return this.userRepository.findOneOrFail(id);
  }

  /**
   * Find one user by Email
   *
   * @param {string} email
   * @return {*}  {Promise<User>}
   * @memberof UsersService
   */
  async findByEmail(email: string): Promise<User> {
    const users = await this.userRepository.find({
      where: {
        email: email,
      },
      take: 1,
    });

    const [user] = users;
    if (!user) {
      throw new NotFoundException(
        `Query failed! User with email ${email} not found`,
      );
    }

    return user;
  }

  /**
   * Update an existing user by ID
   *
   * @param {string} id
   * @param {UpdateUserDto} updateUserDto
   * @return {*}  {Promise<User>}
   * @memberof UsersService
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`Update failed! User #${id} not found`);
    }

    return this.userRepository.save(user);
  }

  /**
   * Delete an existing user by ID
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UsersService
   */
  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new BadRequestException(
        `Delete failed! Could not find a user with id #${id}.`,
      );
    }
    await this.userRepository.remove(user);
    return user;
  }
}
