import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager, FilterQuery } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from '../../database/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { USER_ROLE } from '../../configs/enum/user';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    private readonly i18n: I18nService,
  ) {}

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne(
      { email },
      {
        filters: ['isActive'],
      },
    );
  }

  /**
   * Find a user by ID
   */
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne(
      { id },
      {
        filters: ['isActive'],
      },
    );
  }
}
