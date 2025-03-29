import { Migration } from '@mikro-orm/migrations';

export class Migration20250328173700_create_file_storage_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "file_storage_information" ("id" uuid not null, "kind" text check ("kind" in ('DOCUMENT', 'VIDEO', 'IMAGE')) not null, "url" varchar not null, "mime_type" varchar not null, "size" integer not null, "created_at" timestamp with time zone not null, "created_by" uuid not null, constraint "file_storage_information_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "file_storage_information" cascade;`);
  }

}
