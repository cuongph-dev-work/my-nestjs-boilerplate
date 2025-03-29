import { Migration } from '@mikro-orm/migrations';

export class Migration20250328190305_update_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" alter column "metadata" type jsonb using ("metadata"::jsonb);`);
    this.addSql(`alter table "file_storage_information" alter column "metadata" drop not null;`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" type varchar using ("created_by"::varchar);`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" drop not null;`);
    this.addSql(`alter table "file_storage_information" alter column "updated_by" type varchar using ("updated_by"::varchar);`);
    this.addSql(`alter table "file_storage_information" alter column "updated_by" drop not null;`);
    this.addSql(`alter table "file_storage_information" alter column "deleted_at" type timestamp with time zone using ("deleted_at"::timestamp with time zone);`);
    this.addSql(`alter table "file_storage_information" alter column "deleted_at" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" alter column "metadata" type jsonb using ("metadata"::jsonb);`);
    this.addSql(`alter table "file_storage_information" alter column "metadata" set not null;`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" type varchar using ("created_by"::varchar);`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" set not null;`);
    this.addSql(`alter table "file_storage_information" alter column "updated_by" type varchar using ("updated_by"::varchar);`);
    this.addSql(`alter table "file_storage_information" alter column "updated_by" set not null;`);
    this.addSql(`alter table "file_storage_information" alter column "deleted_at" type timestamp with time zone using ("deleted_at"::timestamp with time zone);`);
    this.addSql(`alter table "file_storage_information" alter column "deleted_at" set not null;`);
  }

}
