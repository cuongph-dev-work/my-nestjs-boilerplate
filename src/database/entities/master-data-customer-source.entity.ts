import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { generateRandomId } from '@utils/helper';
import { BaseEntity } from './base.entity';

/**
 * MasterDataCustomerSource entity representing customer source data
 */
@Entity({ tableName: 'master_data_customer_source' })
export class MasterDataCustomerSource extends BaseEntity {
  /**
   * Primary key identifier for customer source
   */
  @PrimaryKey({ columnType: 'varchar', length: 20 })
  id: string = generateRandomId();

  /**
   * Customer source name (not null)
   */
  @Property({ length: 255, nullable: false })
  name!: string;
}
