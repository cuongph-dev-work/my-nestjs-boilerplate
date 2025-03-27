import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/user.entity';
import { USER_ROLE } from '../../configs/enum/user';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = new User();
    user.email = 'sale1@example.com';
    user.password = 'password123';
    user.role = USER_ROLE.SALE;
    user.first_name = 'Sale';
    user.middle_name = 'Middle';
    user.last_name = 'User';
    user.phone = '0123456789';

    await em.persistAndFlush(user);
  }
}
