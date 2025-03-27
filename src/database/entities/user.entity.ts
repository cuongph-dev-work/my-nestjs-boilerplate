import { USER_ROLE } from '@configs/enum/user';
import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  Filter,
  BaseEntity,
  BeforeCreate,
  Opt,
  Hidden,
} from '@mikro-orm/core';
import { generateRandomId } from '@utils/helper';
import * as bcrypt from 'bcryptjs';

const SALT_ROUND = 11;
/**
 * User entity representing the user table in the database
 * Stores user authentication and profile information
 */
@Entity({ tableName: 'user' })
@Filter({ name: 'isActive', cond: { deleted_at: null } })
@Filter({ name: 'isDeleted', cond: { deleted_at: { $ne: null } } })
@Filter({ name: 'isBlocked', cond: { block_to: { $gt: new Date() } } })
@Filter({ name: 'isNotBlocked', cond: { block_to: { $lte: new Date() } } })
export class User extends BaseEntity {
  /**
   * Primary key identifier for the user
   */
  @PrimaryKey()
  id: string = generateRandomId();

  /**
   * User's email address, must be unique
   */
  @Property({ unique: true, length: 255 })
  email!: string;

  /**
   * User's hashed password
   */
  @Property({ length: 255, lazy: true })
  password!: string;

  /**
   * Token used for password reset functionality
   */
  @Property({ nullable: true, length: 255 })
  reset_token: Opt<string>;

  /**
   * Expiration date for the reset token
   */
  @Property({ nullable: true })
  reset_token_expired_at: Opt<Date>;

  /**
   * URL to the user's avatar/profile image
   */
  @Property({ nullable: true, length: 255 })
  avatar_url: Opt<string>;

  /**
   * User's first name
   */
  @Property({ nullable: true, length: 255 })
  first_name: Opt<string>;

  /**
   * User's middle name
   */
  @Property({ nullable: true, length: 255 })
  middle_name: Opt<string>;

  /**
   * User's last name
   */
  @Property({ nullable: true, length: 255 })
  last_name: Opt<string>;

  /**
   * User's full name
   */
  @Property({ getter: true, persist: false })
  get fullName(): Opt<string> {
    return `${this.first_name} ${this.middle_name} ${this.last_name}`;
  }

  /**
   * User's phone number, limited to 13 characters
   */
  @Property({ nullable: true, length: 13 })
  phone: Opt<string>;

  /**
   * User's role in the system, defaults to SALE
   */
  @Enum({ items: () => USER_ROLE, default: USER_ROLE.SALE })
  role: Opt<USER_ROLE> = USER_ROLE.SALE;

  /**
   * Date until which the user is blocked/suspended
   */
  @Property({ nullable: true })
  block_to: Opt<Date>;

  /**
   * Timestamp when the user record was created
   * Automatically set to current date when record is created
   */
  @Property()
  created_at: Opt<Date> = new Date();

  /**
   * Timestamp when the user record was last updated
   * Automatically set to current date on update
   */

  @Property({ onUpdate: () => new Date() })
  updated_at: Opt<Date> = new Date();

  /**
   * Soft delete timestamp, null for active users
   * When set, indicates the user has been deleted
   */
  @Property({ nullable: true })
  deleted_at: Opt<Date>;

  /**
   * Hash a password using bcrypt
   * @param password The password to hash
   * @returns The hashed password
   */
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, SALT_ROUND);
  }

  /**
   * Hash the password before creating a new user
   */
  @BeforeCreate()
  async beforeCreate() {
    this.password = await User.hashPassword(this.password);
  }
}
