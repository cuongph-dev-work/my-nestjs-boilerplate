import { Migration } from '@mikro-orm/migrations';

export class Migration20250328184734_update_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop constraint if exists "file_storage_information_kind_check";`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" type text using ("created_by"::text);`);

    this.addSql(`alter table "file_storage_information" alter column "created_by" type varchar using ("created_by"::varchar);`);
    this.addSql(`alter table "file_storage_information" add constraint "file_storage_information_kind_check" check("kind" in ('DOCUMENT', 'VIDEO', 'IMAGE', 'ARCHIVE', 'AUDIO', 'OTHER'));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop constraint if exists "file_storage_information_kind_check";`);

    this.addSql(`alter table "file_storage_information" alter column "created_by" drop default;`);
    this.addSql(`alter table "file_storage_information" alter column "created_by" type uuid using ("created_by"::text::uuid);`);
    this.addSql(`alter table "file_storage_information" add constraint "file_storage_information_kind_check" check("kind" in ('DOCUMENT', 'VIDEO', 'IMAGE'));`);
  }

}
