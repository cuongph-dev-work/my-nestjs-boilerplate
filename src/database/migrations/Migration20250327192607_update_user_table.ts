import { Migration } from '@mikro-orm/migrations';

export class Migration20250327192607_update_user_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "reset_token_expired_at" type timestamp with time zone using ("reset_token_expired_at"::timestamp with time zone);`);
    this.addSql(`alter table "user" alter column "block_to" type timestamp with time zone using ("block_to"::timestamp with time zone);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "reset_token_expired_at" type varchar(255) using ("reset_token_expired_at"::varchar(255));`);
    this.addSql(`alter table "user" alter column "block_to" type varchar(255) using ("block_to"::varchar(255));`);
  }

}
