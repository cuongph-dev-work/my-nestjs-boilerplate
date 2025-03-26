import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { USER_ROLE } from '../../configs/enum/user';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user = em.assign(new User(), {
      email: 'sale1@example.com',
      password: await bcrypt.hash('password123', 10),
      role: USER_ROLE.SALE,
      first_name: 'Sale',
      last_name: 'User',
      phone: '0123456789',
      created_at: new Date(),
      updated_at: new Date(),
    });

    await em.persistAndFlush(user);
  }
}
