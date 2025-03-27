import { User } from '@entities/user.entity';
import {
  EntityRepository,
  FilterQuery,
  FindOptions,
  Populate,
} from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos';

@Injectable()
export class UserRepository extends EntityRepository<User> {
  constructor(em: EntityManager) {
    super(em, User);
  }

  /**
   * Find a user by email
   * @param email The email of the user to find
   * @returns The user if found, null otherwise
   */
  async findByEmail(
    email: string,
    populate: Populate<User, 'password'>,
  ): Promise<User | null> {
    return this.findOne(
      { email },
      { filters: ['isActive'], populate: populate },
    );
  }

  /**
   * Find a user by ID
   * @param id The ID of the user to find
   * @returns The user if found, null otherwise
   */
  async findById(id: string): Promise<User | null> {
    return this.findOne({ id }, { filters: ['isActive'] });
  }

  /**
   * Find conditions
   */
  async findConditions(
    conditions: FilterQuery<User>,
    options?: FindOptions<User>,
  ) {
    return this.find(conditions, options);
  }

  /**
   * Create a new user
   */
  async createNewUser(body: CreateUserDto) {
    const user = this.create(body);
    await this.em.persistAndFlush(user);
    return { id: user.id };
  }
}
