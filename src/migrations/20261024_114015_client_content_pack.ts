import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_businesses_stage" AS ENUM('operating', 'in-development');
  CREATE TYPE "public"."enum__businesses_v_version_stage" AS ENUM('operating', 'in-development');
  CREATE TYPE "public"."enum_pages_blocks_places_items_kind" AS ENUM('office', 'operating', 'agriculture', 'in-development');
  CREATE TYPE "public"."enum__pages_v_blocks_places_items_kind" AS ENUM('office', 'operating', 'agriculture', 'in-development');
  ALTER TYPE "public"."enum_enquiries_type" ADD VALUE 'careers' BEFORE 'media';
  CREATE TABLE "pages_blocks_places_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"place" varchar,
  	"kind" "enum_pages_blocks_places_items_kind" DEFAULT 'operating',
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_places_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"place" varchar,
  	"kind" "enum__pages_v_blocks_places_items_kind" DEFAULT 'operating',
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_places" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "site_settings_contact_other_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL
  );
  
  ALTER TABLE "enquiries" ALTER COLUMN "email" DROP NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "group_name" SET DEFAULT 'Zeebundu Group of Companies';
  ALTER TABLE "businesses" ADD COLUMN "enquiry_label" varchar;
  ALTER TABLE "businesses" ADD COLUMN "stage" "enum_businesses_stage" DEFAULT 'operating';
  ALTER TABLE "_businesses_v" ADD COLUMN "version_enquiry_label" varchar;
  ALTER TABLE "_businesses_v" ADD COLUMN "version_stage" "enum__businesses_v_version_stage" DEFAULT 'operating';
  ALTER TABLE "enquiries" ADD COLUMN "organization" varchar;
  ALTER TABLE "homepage" ADD COLUMN "intro_heading" varchar;
  ALTER TABLE "homepage" ADD COLUMN "intro_text" varchar;
  ALTER TABLE "homepage" ADD COLUMN "intro_brand_line" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_intro_heading" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_intro_text" varchar;
  ALTER TABLE "_homepage_v" ADD COLUMN "version_intro_brand_line" varchar;
  ALTER TABLE "pages_blocks_places_items" ADD CONSTRAINT "pages_blocks_places_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_places" ADD CONSTRAINT "pages_blocks_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_places_items" ADD CONSTRAINT "_pages_v_blocks_places_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_places" ADD CONSTRAINT "_pages_v_blocks_places_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_other_phones" ADD CONSTRAINT "site_settings_contact_other_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_places_items_order_idx" ON "pages_blocks_places_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_places_items_parent_id_idx" ON "pages_blocks_places_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_places_order_idx" ON "pages_blocks_places" USING btree ("_order");
  CREATE INDEX "pages_blocks_places_parent_id_idx" ON "pages_blocks_places" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_places_path_idx" ON "pages_blocks_places" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_places_items_order_idx" ON "_pages_v_blocks_places_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_places_items_parent_id_idx" ON "_pages_v_blocks_places_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_places_order_idx" ON "_pages_v_blocks_places" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_places_parent_id_idx" ON "_pages_v_blocks_places" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_places_path_idx" ON "_pages_v_blocks_places" USING btree ("_path");
  CREATE INDEX "site_settings_contact_other_phones_order_idx" ON "site_settings_contact_other_phones" USING btree ("_order");
  CREATE INDEX "site_settings_contact_other_phones_parent_id_idx" ON "site_settings_contact_other_phones" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_places_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_places_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_contact_other_phones" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_places_items" CASCADE;
  DROP TABLE "pages_blocks_places" CASCADE;
  DROP TABLE "_pages_v_blocks_places_items" CASCADE;
  DROP TABLE "_pages_v_blocks_places" CASCADE;
  DROP TABLE "site_settings_contact_other_phones" CASCADE;
  ALTER TABLE "enquiries" ALTER COLUMN "type" SET DATA TYPE text;
  ALTER TABLE "enquiries" ALTER COLUMN "type" SET DEFAULT 'general'::text;
  DROP TYPE "public"."enum_enquiries_type";
  CREATE TYPE "public"."enum_enquiries_type" AS ENUM('general', 'sales', 'partnership', 'media');
  ALTER TABLE "enquiries" ALTER COLUMN "type" SET DEFAULT 'general'::"public"."enum_enquiries_type";
  ALTER TABLE "enquiries" ALTER COLUMN "type" SET DATA TYPE "public"."enum_enquiries_type" USING "type"::"public"."enum_enquiries_type";
  ALTER TABLE "enquiries" ALTER COLUMN "email" SET NOT NULL;
  ALTER TABLE "site_settings" ALTER COLUMN "group_name" SET DEFAULT 'Zeebundu Group';
  ALTER TABLE "businesses" DROP COLUMN "enquiry_label";
  ALTER TABLE "businesses" DROP COLUMN "stage";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_enquiry_label";
  ALTER TABLE "_businesses_v" DROP COLUMN "version_stage";
  ALTER TABLE "enquiries" DROP COLUMN "organization";
  ALTER TABLE "homepage" DROP COLUMN "intro_heading";
  ALTER TABLE "homepage" DROP COLUMN "intro_text";
  ALTER TABLE "homepage" DROP COLUMN "intro_brand_line";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_intro_heading";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_intro_text";
  ALTER TABLE "_homepage_v" DROP COLUMN "version_intro_brand_line";
  DROP TYPE "public"."enum_businesses_stage";
  DROP TYPE "public"."enum__businesses_v_version_stage";
  DROP TYPE "public"."enum_pages_blocks_places_items_kind";
  DROP TYPE "public"."enum__pages_v_blocks_places_items_kind";`)
}
