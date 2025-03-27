import { Migration } from '@mikro-orm/migrations';

export class Migration20250327072348_update_user_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "reset_token_expired_at" type varchar(255) using ("reset_token_expired_at"::varchar(255));`);
    this.addSql(`alter table "user" alter column "block_to" type varchar(255) using ("block_to"::varchar(255));`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamptz(3) using ("updated_at"::timestamptz(3));`);
    this.addSql(`alter table "user" alter column "updated_at" set default current_timestamp(3);`);
    this.addSql(`alter table "user" alter column "deleted_at" type varchar(255) using ("deleted_at"::varchar(255));`);
    this.addSql(`alter table "user" alter column "id" drop default;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "id" type int4 using ("id"::int4);`);
    this.addSql(`alter table "user" alter column "reset_token_expired_at" type timestamptz(6) using ("reset_token_expired_at"::timestamptz(6));`);
    this.addSql(`alter table "user" alter column "block_to" type timestamptz(6) using ("block_to"::timestamptz(6));`);
    this.addSql(`alter table "user" alter column "updated_at" drop default;`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamptz(6) using ("updated_at"::timestamptz(6));`);
    this.addSql(`alter table "user" alter column "deleted_at" type timestamptz(6) using ("deleted_at"::timestamptz(6));`);
    this.addSql(`create sequence if not exists "user_id_seq";`);
    this.addSql(`select setval('user_id_seq', (select max("id") from "user"));`);
    this.addSql(`alter table "user" alter column "id" set default nextval('user_id_seq');`);
  }

}
