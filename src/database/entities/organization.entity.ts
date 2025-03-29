import { Entity, PrimaryKey, Property, Opt } from '@mikro-orm/core';
import { generateRandomId } from '@utils/helper';
import { BaseEntity } from './base.entity';

/**
 * Organization entity representing organization data
 */
@Entity({ tableName: 'organization' })
export class Organization extends BaseEntity {
  /**
   * Primary key identifier for organization
   */
  @PrimaryKey({ columnType: 'varchar', length: 20 })
  id: string = generateRandomId();

  /**
   * Organization code (nullable)
   */
  @Property({ length: 255, nullable: true })
  code: Opt<string>;

  /**
   * Organization name (not null)
   */
  @Property({ length: 255, nullable: false })
  name!: string;
}
