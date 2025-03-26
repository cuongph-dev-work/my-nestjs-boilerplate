import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class User {
  @Property({ columnType: 'uuid' })
  id: string;

  @Property({ persist: false })
  email: string;

  @Property({ persist: false })
  password?: string;

  @Property({ persist: false })
  first_name?: string;

  @Property({ persist: false })
  last_name?: string;

  @Property({ persist: false })
  phone?: string;
}
