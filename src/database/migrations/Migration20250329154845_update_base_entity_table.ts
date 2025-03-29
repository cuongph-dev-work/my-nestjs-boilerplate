import { Migration } from '@mikro-orm/migrations';

export class Migration20250329154845_update_base_entity_table extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "master_data_customer_source" ("id" varchar not null, "created_by" varchar(20) null, "updated_by" varchar(20) null, "created_at" timestamp with time zone not null, "updated_at" timestamp with time zone not null, "deleted_at" timestamp with time zone null, "name" varchar(255) not null, constraint "master_data_customer_source_pkey" primary key ("id"));`);

    this.addSql(`create table "organization" ("id" varchar not null, "created_by" varchar(20) null, "updated_by" varchar(20) null, "created_at" timestamp with time zone not null, "updated_at" timestamp with time zone not null, "deleted_at" timestamp with time zone null, "code" varchar(255) null, "name" varchar(255) not null, constraint "organization_pkey" primary key ("id"));`);

    this.addSql(`create table "customer" ("id" varchar not null, "created_by" varchar(20) null, "updated_by" varchar(20) null, "created_at" timestamp with time zone not null, "updated_at" timestamp with time zone not null, "deleted_at" timestamp with time zone null, "code" varchar(255) not null, "full_name" varchar(255) not null, "gender" text check ("gender" in ('MALE', 'FEMALE', 'OTHER')) null default 'MALE', "phone" varchar(13) null, "email" varchar(255) null, "identify_number" varchar(255) null, "country" varchar(255) null, "person_in_charge_id" varchar not null, "group_type" text check ("group_type" in ('INDIVIDUAL', 'BUSINESS', 'COLLABORATOR', 'PARTNER')) not null default 'INDIVIDUAL', "status" text check ("status" in ('TEMPORARY', 'SAVE')) not null default 'TEMPORARY', "source_id" varchar not null, "organization_id" varchar not null, constraint "customer_pkey" primary key ("id"));`);

    this.addSql(`alter table "customer" add constraint "customer_person_in_charge_id_foreign" foreign key ("person_in_charge_id") references "user" ("id") on update cascade;`);
    this.addSql(`alter table "customer" add constraint "customer_source_id_foreign" foreign key ("source_id") references "master_data_customer_source" ("id") on update cascade;`);
    this.addSql(`alter table "customer" add constraint "customer_organization_id_foreign" foreign key ("organization_id") references "organization" ("id") on update cascade;`);

    this.addSql(`alter table "user" add column "created_by" varchar(20) null, add column "updated_by" varchar(20) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "customer" drop constraint "customer_source_id_foreign";`);

    this.addSql(`alter table "customer" drop constraint "customer_organization_id_foreign";`);

    this.addSql(`drop table if exists "master_data_customer_source" cascade;`);

    this.addSql(`drop table if exists "organization" cascade;`);

    this.addSql(`drop table if exists "customer" cascade;`);

    this.addSql(`alter table "user" drop column "created_by", drop column "updated_by";`);
  }

}
