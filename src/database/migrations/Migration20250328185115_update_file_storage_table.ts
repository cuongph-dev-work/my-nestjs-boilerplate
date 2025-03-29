import { Migration } from '@mikro-orm/migrations';

export class Migration20250328185115_update_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" add column "deleted_at" timestamp with time zone not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop column "deleted_at";`);
  }

}
