import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { I18nService } from 'nestjs-i18n';
import { UserRepository } from './user.repository';
import { CreateUserDto, ShowUserResponseDto } from './dtos';
import { plainToInstance } from 'class-transformer';
import { transformToValidationError } from '@utils/helper';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => UserRepository))
    private readonly userRepository: UserRepository,
    private readonly i18n: I18nService,
  ) {}

  private async checkUniqueEmail(email: string) {
    const user = await this.userRepository.findByEmail(email, []);
    if (user) {
      throw transformToValidationError(
        [{ property: 'email', key: 'IsUnique', params: {} }],
        this.i18n,
      );
    }
  }

  /**
   * Find a user by email
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email, ['password']);
  }

  /**
   * Find a user by ID
   */
  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  /**
   * Create a new user
   */
  async createUser(body: CreateUserDto) {
    // check unique email
    await this.checkUniqueEmail(body.email);
    // create user
    return this.userRepository.createNewUser(body);
  }

  /**
   * Get user by id
   */
  async getUserById(id: string): Promise<ShowUserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(this.i18n.t('message.user_not_found'));
    }
    return plainToInstance(ShowUserResponseDto, user);
  }
}
