import { Migration } from '@mikro-orm/migrations';

export class Migration20250328190209_update_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" add column "metadata" jsonb not null, add column "updated_by" varchar not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop column "metadata", drop column "updated_by";`);
  }

}
