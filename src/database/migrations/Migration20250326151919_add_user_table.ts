import { Migration } from '@mikro-orm/migrations';

export class Migration20250326151919_add_user_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null, "reset_token" varchar(255) null, "reset_token_expired_at" timestamptz null, "avatar_url" varchar(255) null, "first_name" varchar(255) null, "middle_name" varchar(255) null, "last_name" varchar(255) null, "phone" varchar(13) null, "role" text check ("role" in ('SALE', 'OPERATOR', 'TOUR_GUIDE', 'ACCOUNTANT')) not null default 'SALE', "block_to" timestamptz null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
