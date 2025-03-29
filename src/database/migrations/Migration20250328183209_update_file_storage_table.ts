import { Migration } from '@mikro-orm/migrations';

export class Migration20250328183209_update_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "file_storage_information" add column "original_name" varchar not null;`);
    this.addSql(`alter table "file_storage_information" alter column "id" type varchar using ("id"::varchar);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop column "original_name";`);

    this.addSql(`alter table "file_storage_information" alter column "id" drop default;`);
    this.addSql(`alter table "file_storage_information" alter column "id" type uuid using ("id"::text::uuid);`);
  }

}
