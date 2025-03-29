import { GENDER, GROUP_TYPE } from '@configs/enum/customer';
import { RECORD_STATUS } from '@configs/enum/app';
import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
  Filter,
  Opt,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { MasterDataCustomerSource } from './master-data-customer-source.entity';
import { Organization } from './organization.entity';
import { generateRandomId } from '@utils/helper';
import { BaseEntity } from './base.entity';

@Entity({ tableName: 'customer' })
@Filter({ name: 'isActive', cond: { deleted_at: null } })
@Filter({ name: 'isDeleted', cond: { deleted_at: { $ne: null } } })
export class Customer extends BaseEntity {
  /**
   * Primary key identifier for the customer
   */
  @PrimaryKey({ columnType: 'varchar', length: 20 })
  id: string = generateRandomId();

  /**
   * Unique code for the customer
   */
  @Property({ length: 255 })
  code!: string;

  /**
   * Full name of the customer
   */
  @Property({ length: 255 })
  full_name!: string;

  /**
   * Gender of the customer (Male, Female, Other)
   */
  @Enum({ items: () => GENDER, nullable: true, default: GENDER.MALE })
  gender: Opt<GENDER>;

  /**
   * Customer's phone number
   */
  @Property({ length: 13, nullable: true })
  phone: Opt<string>;

  /**
   * Customer's email address
   */
  @Property({ length: 255, nullable: true })
  email: Opt<string>;

  /**
   * Identification number of the customer (e.g., national ID, passport)
   */
  @Property({ length: 255, nullable: true })
  identify_number: Opt<string>;

  /**
   * Country of residence of the customer
   */
  @Property({ length: 255, nullable: true })
  country: Opt<string>;

  /**
   * The user responsible for managing this customer
   */
  @ManyToOne(() => User)
  person_in_charge!: User;

  /**
   * Group type of the customer (Individual, Business, Collaborator, Partner)
   */
  @Enum({ items: () => GROUP_TYPE, default: GROUP_TYPE.INDIVIDUAL })
  group_type!: GROUP_TYPE;

  /**
   * Status of the customer (Temporary, Save)
   */
  @Enum({ items: () => RECORD_STATUS, default: RECORD_STATUS.TEMPORARY })
  status!: RECORD_STATUS;

  /**
   * Reference to the master data customer source
   */
  @ManyToOne(() => MasterDataCustomerSource)
  source!: MasterDataCustomerSource;

  /**
   * Reference to the organization this customer belongs to
   */
  @ManyToOne(() => Organization)
  organization!: Organization;
}
