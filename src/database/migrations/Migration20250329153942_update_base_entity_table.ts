import { Migration } from '@mikro-orm/migrations';

export class Migration20250329153942_update_base_entity_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "file_storage_information" add column "updated_at" timestamp with time zone not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "file_storage_information" drop column "updated_at";`);
  }

}
