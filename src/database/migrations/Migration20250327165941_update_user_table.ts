import { Migration } from '@mikro-orm/migrations';

export class Migration20250327165941_update_user_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_role_check";`);

    this.addSql(`alter table "user" alter column "id" type varchar using ("id"::varchar);`);
    this.addSql(`alter table "user" alter column "updated_at" drop default;`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamptz using ("updated_at"::timestamptz);`);
    this.addSql(`alter table "user" add constraint "user_role_check" check("role" in ('SALE', 'OPERATOR', 'TOUR_GUIDE', 'ACCOUNTANT', 'ADMIN'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint if exists "user_role_check";`);

    this.addSql(`alter table "user" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "user" alter column "updated_at" type timestamptz(3) using ("updated_at"::timestamptz(3));`);
    this.addSql(`alter table "user" alter column "updated_at" set default current_timestamp(3);`);
    this.addSql(`alter table "user" add constraint "user_role_check" check("role" in ('SALE', 'OPERATOR', 'TOUR_GUIDE', 'ACCOUNTANT'));`);
  }

}
