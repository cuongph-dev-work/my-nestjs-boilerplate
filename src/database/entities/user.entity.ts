import { USER_ROLE } from '@configs/enum/user';
import { Entity, PrimaryKey, Property, Enum, Filter } from '@mikro-orm/core';

/**
 * User entity representing the user table in the database
 * Stores user authentication and profile information
 */
@Entity({ tableName: 'user' })
@Filter({ name: 'isActive', cond: { deleted_at: null } })
@Filter({ name: 'isDeleted', cond: { deleted_at: { $ne: null } } })
@Filter({ name: 'isBlocked', cond: { block_to: { $gt: new Date() } } })
@Filter({ name: 'isNotBlocked', cond: { block_to: { $lte: new Date() } } })
export class User {
  /**
   * Primary key identifier for the user
   */
  @PrimaryKey()
  id!: number;

  /**
   * User's email address, must be unique
   */
  @Property({ unique: true, length: 255 })
  email!: string;

  /**
   * User's hashed password
   */
  @Property({ length: 255 })
  password!: string;

  /**
   * Token used for password reset functionality
   */
  @Property({ nullable: true, length: 255 })
  reset_token?: string;

  /**
   * Expiration date for the reset token
   */
  @Property({ nullable: true })
  reset_token_expired_at?: Date;

  /**
   * URL to the user's avatar/profile image
   */
  @Property({ nullable: true, length: 255 })
  avatar_url?: string;

  /**
   * User's first name
   */
  @Property({ nullable: true, length: 255 })
  first_name?: string;

  /**
   * User's middle name
   */
  @Property({ nullable: true, length: 255 })
  middle_name?: string;

  /**
   * User's last name
   */
  @Property({ nullable: true, length: 255 })
  last_name?: string;

  /**
   * User's phone number, limited to 13 characters
   */
  @Property({ nullable: true, length: 13 })
  phone?: string;

  /**
   * User's role in the system, defaults to SALE
   */
  @Enum({ items: () => USER_ROLE, default: USER_ROLE.SALE })
  role: USER_ROLE = USER_ROLE.SALE;

  /**
   * Date until which the user is blocked/suspended
   */
  @Property({ nullable: true })
  block_to?: Date;

  /**
   * Timestamp when the user record was created
   * Automatically set to current date when record is created
   */
  @Property()
  created_at?: Date = new Date();

  /**
   * Timestamp when the user record was last updated
   * Automatically set to current date on update
   */
  @Property({ onUpdate: () => new Date() })
  updated_at?: Date = new Date();

  /**
   * Soft delete timestamp, null for active users
   * When set, indicates the user has been deleted
   */
  @Property({ nullable: true })
  deleted_at?: Date;
}
