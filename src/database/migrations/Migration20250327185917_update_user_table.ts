import { Migration } from '@mikro-orm/migrations';

export class Migration20250327185917_update_user_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "deleted_at" type timestamp with time zone using ("deleted_at"::timestamp with time zone);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "deleted_at" type varchar(255) using ("deleted_at"::varchar(255));`);
  }

}
