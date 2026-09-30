import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_businesses_blocks_cta_style" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_businesses_locations_district" AS ENUM('western-area-urban', 'western-area-rural', 'bo', 'bombali', 'bonthe', 'falaba', 'kailahun', 'kambia', 'karene', 'kenema', 'koinadugu', 'kono', 'moyamba', 'port-loko', 'pujehun', 'tonkolili');
  CREATE TYPE "public"."enum_businesses_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__businesses_v_blocks_cta_style" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__businesses_v_version_locations_district" AS ENUM('western-area-urban', 'western-area-rural', 'bo', 'bombali', 'bonthe', 'falaba', 'kailahun', 'kambia', 'karene', 'kenema', 'koinadugu', 'kono', 'moyamba', 'port-loko', 'pujehun', 'tonkolili');
  CREATE TYPE "public"."enum__businesses_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_news_category" AS ENUM('news', 'press', 'story');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('news', 'press', 'story');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_impact_programmes_pillar" AS ENUM('education', 'health', 'environment', 'enterprise', 'community');
  CREATE TYPE "public"."enum_impact_programmes_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__impact_programmes_v_version_pillar" AS ENUM('education', 'health', 'environment', 'enterprise', 'community');
  CREATE TYPE "public"."enum__impact_programmes_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_leadership_group" AS ENUM('executive', 'board');
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_enquiries_type" AS ENUM('general', 'sales', 'partnership', 'media');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'in-progress', 'closed', 'spam');
  CREATE TYPE "public"."enum_users_role" AS ENUM('super-admin', 'group-editor', 'business-editor');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_homepage_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__homepage_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "businesses_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "businesses_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "businesses_blocks_rates_table_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"currency" varchar,
  	"buy" numeric,
  	"sell" numeric
  );
  
  CREATE TABLE "businesses_blocks_rates_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Indicative exchange rates',
  	"base_currency" varchar DEFAULT 'SLE',
  	"updated_at" timestamp(3) with time zone,
  	"note" varchar DEFAULT 'Rates are indicative and may change during the day. Visit a branch for a quote.',
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_loan_products_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"amount_range" varchar,
  	"interest_rate" varchar,
  	"term" varchar
  );
  
  CREATE TABLE "businesses_blocks_loan_products_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "businesses_blocks_loan_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Loan products',
  	"intro" varchar,
  	"terms" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_product_list_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"size" varchar,
  	"pack" varchar,
  	"price" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "businesses_blocks_product_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Products',
  	"intro" varchar,
  	"note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_rooms_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"capacity" varchar,
  	"rate" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "businesses_blocks_rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "businesses_blocks_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms & amenities',
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "businesses_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently asked questions',
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"style" "enum_businesses_blocks_cta_style" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "businesses_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"district" "enum_businesses_locations_district",
  	"address" varchar,
  	"phone" varchar,
  	"hours" varchar,
  	"lat" numeric,
  	"lng" numeric
  );
  
  CREATE TABLE "businesses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"tagline" varchar,
  	"summary" varchar,
  	"logo_id" integer,
  	"hero_image_id" integer,
  	"overview" jsonb,
  	"contact_phone" varchar,
  	"contact_whatsapp" varchar,
  	"contact_email" varchar,
  	"contact_enquiry_email" varchar,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_linkedin" varchar,
  	"socials_tiktok" varchar,
  	"socials_x" varchar,
  	"socials_youtube" varchar,
  	"website" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"sector_id" integer,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_businesses_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "businesses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_businesses_v_version_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rates_table_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"currency" varchar,
  	"buy" numeric,
  	"sell" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rates_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Indicative exchange rates',
  	"base_currency" varchar DEFAULT 'SLE',
  	"updated_at" timestamp(3) with time zone,
  	"note" varchar DEFAULT 'Rates are indicative and may change during the day. Visit a branch for a quote.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_loan_products_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"amount_range" varchar,
  	"interest_rate" varchar,
  	"term" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_loan_products_requirements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_loan_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Loan products',
  	"intro" varchar,
  	"terms" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_product_list_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"size" varchar,
  	"pack" varchar,
  	"price" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_product_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Products',
  	"intro" varchar,
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rooms_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"capacity" varchar,
  	"rate" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rooms_amenities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rooms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Rooms & amenities',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently asked questions',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"style" "enum__businesses_v_blocks_cta_style" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_businesses_v_version_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"district" "enum__businesses_v_version_locations_district",
  	"address" varchar,
  	"phone" varchar,
  	"hours" varchar,
  	"lat" numeric,
  	"lng" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_businesses_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_tagline" varchar,
  	"version_summary" varchar,
  	"version_logo_id" integer,
  	"version_hero_image_id" integer,
  	"version_overview" jsonb,
  	"version_contact_phone" varchar,
  	"version_contact_whatsapp" varchar,
  	"version_contact_email" varchar,
  	"version_contact_enquiry_email" varchar,
  	"version_socials_facebook" varchar,
  	"version_socials_instagram" varchar,
  	"version_socials_linkedin" varchar,
  	"version_socials_tiktok" varchar,
  	"version_socials_x" varchar,
  	"version_socials_youtube" varchar,
  	"version_website" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_sector_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 0,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__businesses_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_businesses_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "sectors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"excerpt" varchar,
  	"hero_image_id" integer,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category" "enum_news_category" DEFAULT 'news',
  	"business_id" integer,
  	"author" varchar,
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sectors_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_excerpt" varchar,
  	"version_hero_image_id" integer,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category" "enum__news_v_version_category" DEFAULT 'news',
  	"version_business_id" integer,
  	"version_author" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sectors_id" integer
  );
  
  CREATE TABLE "impact_programmes_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "impact_programmes_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "impact_programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"hero_image_id" integer,
  	"body" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"pillar" "enum_impact_programmes_pillar",
  	"business_id" integer,
  	"featured" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_impact_programmes_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "impact_programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_impact_programmes_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_impact_programmes_v_version_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"logo_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_impact_programmes_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_summary" varchar,
  	"version_hero_image_id" integer,
  	"version_body" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_pillar" "enum__impact_programmes_v_version_pillar",
  	"version_business_id" integer,
  	"version_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__impact_programmes_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_impact_programmes_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "leadership" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar,
  	"group" "enum_leadership_group" DEFAULT 'executive' NOT NULL,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"style" "enum_pages_blocks_cta_style" DEFAULT 'dark',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently asked questions',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_services_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"text" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"style" "enum__pages_v_blocks_cta_style" DEFAULT 'dark',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Frequently asked questions',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"message" varchar NOT NULL,
  	"page_url" varchar,
  	"business_id" integer,
  	"type" "enum_enquiries_type" DEFAULT 'general' NOT NULL,
  	"status" "enum_enquiries_status" DEFAULT 'new' NOT NULL,
  	"internal_notes" varchar,
  	"ip_hash" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"business_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "users_tenants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tenant_id" integer
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'business-editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"businesses_id" integer,
  	"news_id" integer,
  	"impact_programmes_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"businesses_id" integer,
  	"sectors_id" integer,
  	"news_id" integer,
  	"impact_programmes_id" integer,
  	"leadership_id" integer,
  	"pages_id" integer,
  	"enquiries_id" integer,
  	"media_id" integer,
  	"users_id" integer,
  	"redirects_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_headline" varchar,
  	"hero_subline" varchar,
  	"hero_image_id" integer,
  	"hero_primary_cta_label" varchar,
  	"hero_primary_cta_url" varchar,
  	"hero_secondary_cta_label" varchar,
  	"hero_secondary_cta_url" varchar,
  	"featured_impact_id" integer,
  	"chairman_quote" varchar,
  	"chairman_name" varchar,
  	"chairman_title" varchar,
  	"chairman_portrait_id" integer,
  	"chairman_link_label" varchar,
  	"chairman_link_url" varchar,
  	"cta_band_heading" varchar,
  	"cta_band_text" varchar,
  	"cta_band_link_label" varchar,
  	"cta_band_link_url" varchar,
  	"_status" "enum_homepage_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "homepage_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"businesses_id" integer
  );
  
  CREATE TABLE "_homepage_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_eyebrow" varchar,
  	"version_hero_headline" varchar,
  	"version_hero_subline" varchar,
  	"version_hero_image_id" integer,
  	"version_hero_primary_cta_label" varchar,
  	"version_hero_primary_cta_url" varchar,
  	"version_hero_secondary_cta_label" varchar,
  	"version_hero_secondary_cta_url" varchar,
  	"version_featured_impact_id" integer,
  	"version_chairman_quote" varchar,
  	"version_chairman_name" varchar,
  	"version_chairman_title" varchar,
  	"version_chairman_portrait_id" integer,
  	"version_chairman_link_label" varchar,
  	"version_chairman_link_url" varchar,
  	"version_cta_band_heading" varchar,
  	"version_cta_band_text" varchar,
  	"version_cta_band_link_label" varchar,
  	"version_cta_band_link_url" varchar,
  	"version__status" "enum__homepage_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_homepage_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"businesses_id" integer
  );
  
  CREATE TABLE "media_kit_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"file_id" integer NOT NULL
  );
  
  CREATE TABLE "media_kit" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"boilerplate" varchar,
  	"brand_guidelines_id" integer,
  	"press_contact_name" varchar,
  	"press_contact_email" varchar,
  	"press_contact_phone" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_name" varchar DEFAULT 'Zeebundu Group' NOT NULL,
  	"contact_address" varchar,
  	"contact_phone" varchar,
  	"contact_whatsapp" varchar,
  	"contact_email" varchar,
  	"contact_enquiry_email" varchar,
  	"socials_facebook" varchar,
  	"socials_instagram" varchar,
  	"socials_linkedin" varchar,
  	"socials_tiktok" varchar,
  	"socials_x" varchar,
  	"socials_youtube" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tagline" varchar,
  	"show_newsletter" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "businesses_services" ADD CONSTRAINT "businesses_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses_services" ADD CONSTRAINT "businesses_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_stats" ADD CONSTRAINT "businesses_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rates_table_rates" ADD CONSTRAINT "businesses_blocks_rates_table_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_rates_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rates_table" ADD CONSTRAINT "businesses_blocks_rates_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_loan_products_products" ADD CONSTRAINT "businesses_blocks_loan_products_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_loan_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_loan_products_requirements" ADD CONSTRAINT "businesses_blocks_loan_products_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_loan_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_loan_products" ADD CONSTRAINT "businesses_blocks_loan_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_product_list_products" ADD CONSTRAINT "businesses_blocks_product_list_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses_blocks_product_list_products" ADD CONSTRAINT "businesses_blocks_product_list_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_product_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_product_list" ADD CONSTRAINT "businesses_blocks_product_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rooms_rooms" ADD CONSTRAINT "businesses_blocks_rooms_rooms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rooms_rooms" ADD CONSTRAINT "businesses_blocks_rooms_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rooms_amenities" ADD CONSTRAINT "businesses_blocks_rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rooms" ADD CONSTRAINT "businesses_blocks_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_faq_items" ADD CONSTRAINT "businesses_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_faq" ADD CONSTRAINT "businesses_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_cta" ADD CONSTRAINT "businesses_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_blocks_rich_text" ADD CONSTRAINT "businesses_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_locations" ADD CONSTRAINT "businesses_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses" ADD CONSTRAINT "businesses_sector_id_sectors_id_fk" FOREIGN KEY ("sector_id") REFERENCES "public"."sectors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "businesses_rels" ADD CONSTRAINT "businesses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "businesses_rels" ADD CONSTRAINT "businesses_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_version_services" ADD CONSTRAINT "_businesses_v_version_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v_version_services" ADD CONSTRAINT "_businesses_v_version_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_version_stats" ADD CONSTRAINT "_businesses_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rates_table_rates" ADD CONSTRAINT "_businesses_v_blocks_rates_table_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_rates_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rates_table" ADD CONSTRAINT "_businesses_v_blocks_rates_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_loan_products_products" ADD CONSTRAINT "_businesses_v_blocks_loan_products_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_loan_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_loan_products_requirements" ADD CONSTRAINT "_businesses_v_blocks_loan_products_requirements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_loan_products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_loan_products" ADD CONSTRAINT "_businesses_v_blocks_loan_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_product_list_products" ADD CONSTRAINT "_businesses_v_blocks_product_list_products_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_product_list_products" ADD CONSTRAINT "_businesses_v_blocks_product_list_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_product_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_product_list" ADD CONSTRAINT "_businesses_v_blocks_product_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rooms_rooms" ADD CONSTRAINT "_businesses_v_blocks_rooms_rooms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rooms_rooms" ADD CONSTRAINT "_businesses_v_blocks_rooms_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rooms_amenities" ADD CONSTRAINT "_businesses_v_blocks_rooms_amenities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_rooms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rooms" ADD CONSTRAINT "_businesses_v_blocks_rooms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_faq_items" ADD CONSTRAINT "_businesses_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_faq" ADD CONSTRAINT "_businesses_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_cta" ADD CONSTRAINT "_businesses_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_blocks_rich_text" ADD CONSTRAINT "_businesses_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_version_locations" ADD CONSTRAINT "_businesses_v_version_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_parent_id_businesses_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v" ADD CONSTRAINT "_businesses_v_version_sector_id_sectors_id_fk" FOREIGN KEY ("version_sector_id") REFERENCES "public"."sectors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_businesses_v_rels" ADD CONSTRAINT "_businesses_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_businesses_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_businesses_v_rels" ADD CONSTRAINT "_businesses_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sectors" ADD CONSTRAINT "sectors_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_sectors_fk" FOREIGN KEY ("sectors_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_business_id_businesses_id_fk" FOREIGN KEY ("version_business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_sectors_fk" FOREIGN KEY ("sectors_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_programmes_stats" ADD CONSTRAINT "impact_programmes_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_programmes_partners" ADD CONSTRAINT "impact_programmes_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_programmes_partners" ADD CONSTRAINT "impact_programmes_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impact_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_programmes" ADD CONSTRAINT "impact_programmes_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_programmes" ADD CONSTRAINT "impact_programmes_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_programmes" ADD CONSTRAINT "impact_programmes_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impact_programmes_rels" ADD CONSTRAINT "impact_programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impact_programmes_rels" ADD CONSTRAINT "impact_programmes_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v_version_stats" ADD CONSTRAINT "_impact_programmes_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v_version_partners" ADD CONSTRAINT "_impact_programmes_v_version_partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v_version_partners" ADD CONSTRAINT "_impact_programmes_v_version_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_impact_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v" ADD CONSTRAINT "_impact_programmes_v_parent_id_impact_programmes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impact_programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v" ADD CONSTRAINT "_impact_programmes_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v" ADD CONSTRAINT "_impact_programmes_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v" ADD CONSTRAINT "_impact_programmes_v_version_business_id_businesses_id_fk" FOREIGN KEY ("version_business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v_rels" ADD CONSTRAINT "_impact_programmes_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_impact_programmes_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_impact_programmes_v_rels" ADD CONSTRAINT "_impact_programmes_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leadership" ADD CONSTRAINT "leadership_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text" ADD CONSTRAINT "pages_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid_items" ADD CONSTRAINT "pages_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_services_grid" ADD CONSTRAINT "pages_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid_items" ADD CONSTRAINT "_pages_v_blocks_services_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_services_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_services_grid" ADD CONSTRAINT "_pages_v_blocks_services_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_business_id_businesses_id_fk" FOREIGN KEY ("business_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_tenant_id_businesses_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."businesses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_businesses_fk" FOREIGN KEY ("businesses_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_impact_programmes_fk" FOREIGN KEY ("impact_programmes_id") REFERENCES "public"."impact_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_businesses_fk" FOREIGN KEY ("businesses_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sectors_fk" FOREIGN KEY ("sectors_id") REFERENCES "public"."sectors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impact_programmes_fk" FOREIGN KEY ("impact_programmes_id") REFERENCES "public"."impact_programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_fk" FOREIGN KEY ("leadership_id") REFERENCES "public"."leadership"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_featured_impact_id_impact_programmes_id_fk" FOREIGN KEY ("featured_impact_id") REFERENCES "public"."impact_programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_chairman_portrait_id_media_id_fk" FOREIGN KEY ("chairman_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_rels" ADD CONSTRAINT "homepage_rels_businesses_fk" FOREIGN KEY ("businesses_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_featured_impact_id_impact_programmes_id_fk" FOREIGN KEY ("version_featured_impact_id") REFERENCES "public"."impact_programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v" ADD CONSTRAINT "_homepage_v_version_chairman_portrait_id_media_id_fk" FOREIGN KEY ("version_chairman_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_homepage_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_homepage_v_rels" ADD CONSTRAINT "_homepage_v_rels_businesses_fk" FOREIGN KEY ("businesses_id") REFERENCES "public"."businesses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_kit_logos" ADD CONSTRAINT "media_kit_logos_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_kit_logos" ADD CONSTRAINT "media_kit_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media_kit"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_kit" ADD CONSTRAINT "media_kit_brand_guidelines_id_media_id_fk" FOREIGN KEY ("brand_guidelines_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_stats" ADD CONSTRAINT "site_settings_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "businesses_services_order_idx" ON "businesses_services" USING btree ("_order");
  CREATE INDEX "businesses_services_parent_id_idx" ON "businesses_services" USING btree ("_parent_id");
  CREATE INDEX "businesses_services_image_idx" ON "businesses_services" USING btree ("image_id");
  CREATE INDEX "businesses_stats_order_idx" ON "businesses_stats" USING btree ("_order");
  CREATE INDEX "businesses_stats_parent_id_idx" ON "businesses_stats" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rates_table_rates_order_idx" ON "businesses_blocks_rates_table_rates" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rates_table_rates_parent_id_idx" ON "businesses_blocks_rates_table_rates" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rates_table_order_idx" ON "businesses_blocks_rates_table" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rates_table_parent_id_idx" ON "businesses_blocks_rates_table" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rates_table_path_idx" ON "businesses_blocks_rates_table" USING btree ("_path");
  CREATE INDEX "businesses_blocks_loan_products_products_order_idx" ON "businesses_blocks_loan_products_products" USING btree ("_order");
  CREATE INDEX "businesses_blocks_loan_products_products_parent_id_idx" ON "businesses_blocks_loan_products_products" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_loan_products_requirements_order_idx" ON "businesses_blocks_loan_products_requirements" USING btree ("_order");
  CREATE INDEX "businesses_blocks_loan_products_requirements_parent_id_idx" ON "businesses_blocks_loan_products_requirements" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_loan_products_order_idx" ON "businesses_blocks_loan_products" USING btree ("_order");
  CREATE INDEX "businesses_blocks_loan_products_parent_id_idx" ON "businesses_blocks_loan_products" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_loan_products_path_idx" ON "businesses_blocks_loan_products" USING btree ("_path");
  CREATE INDEX "businesses_blocks_product_list_products_order_idx" ON "businesses_blocks_product_list_products" USING btree ("_order");
  CREATE INDEX "businesses_blocks_product_list_products_parent_id_idx" ON "businesses_blocks_product_list_products" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_product_list_products_image_idx" ON "businesses_blocks_product_list_products" USING btree ("image_id");
  CREATE INDEX "businesses_blocks_product_list_order_idx" ON "businesses_blocks_product_list" USING btree ("_order");
  CREATE INDEX "businesses_blocks_product_list_parent_id_idx" ON "businesses_blocks_product_list" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_product_list_path_idx" ON "businesses_blocks_product_list" USING btree ("_path");
  CREATE INDEX "businesses_blocks_rooms_rooms_order_idx" ON "businesses_blocks_rooms_rooms" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rooms_rooms_parent_id_idx" ON "businesses_blocks_rooms_rooms" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rooms_rooms_image_idx" ON "businesses_blocks_rooms_rooms" USING btree ("image_id");
  CREATE INDEX "businesses_blocks_rooms_amenities_order_idx" ON "businesses_blocks_rooms_amenities" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rooms_amenities_parent_id_idx" ON "businesses_blocks_rooms_amenities" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rooms_order_idx" ON "businesses_blocks_rooms" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rooms_parent_id_idx" ON "businesses_blocks_rooms" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rooms_path_idx" ON "businesses_blocks_rooms" USING btree ("_path");
  CREATE INDEX "businesses_blocks_faq_items_order_idx" ON "businesses_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "businesses_blocks_faq_items_parent_id_idx" ON "businesses_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_faq_order_idx" ON "businesses_blocks_faq" USING btree ("_order");
  CREATE INDEX "businesses_blocks_faq_parent_id_idx" ON "businesses_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_faq_path_idx" ON "businesses_blocks_faq" USING btree ("_path");
  CREATE INDEX "businesses_blocks_cta_order_idx" ON "businesses_blocks_cta" USING btree ("_order");
  CREATE INDEX "businesses_blocks_cta_parent_id_idx" ON "businesses_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_cta_path_idx" ON "businesses_blocks_cta" USING btree ("_path");
  CREATE INDEX "businesses_blocks_rich_text_order_idx" ON "businesses_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "businesses_blocks_rich_text_parent_id_idx" ON "businesses_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "businesses_blocks_rich_text_path_idx" ON "businesses_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "businesses_locations_order_idx" ON "businesses_locations" USING btree ("_order");
  CREATE INDEX "businesses_locations_parent_id_idx" ON "businesses_locations" USING btree ("_parent_id");
  CREATE INDEX "businesses_logo_idx" ON "businesses" USING btree ("logo_id");
  CREATE INDEX "businesses_hero_image_idx" ON "businesses" USING btree ("hero_image_id");
  CREATE INDEX "businesses_meta_meta_image_idx" ON "businesses" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "businesses_slug_idx" ON "businesses" USING btree ("slug");
  CREATE INDEX "businesses_sector_idx" ON "businesses" USING btree ("sector_id");
  CREATE INDEX "businesses_updated_at_idx" ON "businesses" USING btree ("updated_at");
  CREATE INDEX "businesses_created_at_idx" ON "businesses" USING btree ("created_at");
  CREATE INDEX "businesses__status_idx" ON "businesses" USING btree ("_status");
  CREATE INDEX "businesses_rels_order_idx" ON "businesses_rels" USING btree ("order");
  CREATE INDEX "businesses_rels_parent_idx" ON "businesses_rels" USING btree ("parent_id");
  CREATE INDEX "businesses_rels_path_idx" ON "businesses_rels" USING btree ("path");
  CREATE INDEX "businesses_rels_media_id_idx" ON "businesses_rels" USING btree ("media_id");
  CREATE INDEX "_businesses_v_version_services_order_idx" ON "_businesses_v_version_services" USING btree ("_order");
  CREATE INDEX "_businesses_v_version_services_parent_id_idx" ON "_businesses_v_version_services" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_version_services_image_idx" ON "_businesses_v_version_services" USING btree ("image_id");
  CREATE INDEX "_businesses_v_version_stats_order_idx" ON "_businesses_v_version_stats" USING btree ("_order");
  CREATE INDEX "_businesses_v_version_stats_parent_id_idx" ON "_businesses_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rates_table_rates_order_idx" ON "_businesses_v_blocks_rates_table_rates" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rates_table_rates_parent_id_idx" ON "_businesses_v_blocks_rates_table_rates" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rates_table_order_idx" ON "_businesses_v_blocks_rates_table" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rates_table_parent_id_idx" ON "_businesses_v_blocks_rates_table" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rates_table_path_idx" ON "_businesses_v_blocks_rates_table" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_loan_products_products_order_idx" ON "_businesses_v_blocks_loan_products_products" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_loan_products_products_parent_id_idx" ON "_businesses_v_blocks_loan_products_products" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_loan_products_requirements_order_idx" ON "_businesses_v_blocks_loan_products_requirements" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_loan_products_requirements_parent_id_idx" ON "_businesses_v_blocks_loan_products_requirements" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_loan_products_order_idx" ON "_businesses_v_blocks_loan_products" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_loan_products_parent_id_idx" ON "_businesses_v_blocks_loan_products" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_loan_products_path_idx" ON "_businesses_v_blocks_loan_products" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_product_list_products_order_idx" ON "_businesses_v_blocks_product_list_products" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_product_list_products_parent_id_idx" ON "_businesses_v_blocks_product_list_products" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_product_list_products_image_idx" ON "_businesses_v_blocks_product_list_products" USING btree ("image_id");
  CREATE INDEX "_businesses_v_blocks_product_list_order_idx" ON "_businesses_v_blocks_product_list" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_product_list_parent_id_idx" ON "_businesses_v_blocks_product_list" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_product_list_path_idx" ON "_businesses_v_blocks_product_list" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_rooms_rooms_order_idx" ON "_businesses_v_blocks_rooms_rooms" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rooms_rooms_parent_id_idx" ON "_businesses_v_blocks_rooms_rooms" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rooms_rooms_image_idx" ON "_businesses_v_blocks_rooms_rooms" USING btree ("image_id");
  CREATE INDEX "_businesses_v_blocks_rooms_amenities_order_idx" ON "_businesses_v_blocks_rooms_amenities" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rooms_amenities_parent_id_idx" ON "_businesses_v_blocks_rooms_amenities" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rooms_order_idx" ON "_businesses_v_blocks_rooms" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rooms_parent_id_idx" ON "_businesses_v_blocks_rooms" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rooms_path_idx" ON "_businesses_v_blocks_rooms" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_faq_items_order_idx" ON "_businesses_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_faq_items_parent_id_idx" ON "_businesses_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_faq_order_idx" ON "_businesses_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_faq_parent_id_idx" ON "_businesses_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_faq_path_idx" ON "_businesses_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_cta_order_idx" ON "_businesses_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_cta_parent_id_idx" ON "_businesses_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_cta_path_idx" ON "_businesses_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_businesses_v_blocks_rich_text_order_idx" ON "_businesses_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_businesses_v_blocks_rich_text_parent_id_idx" ON "_businesses_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_blocks_rich_text_path_idx" ON "_businesses_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_businesses_v_version_locations_order_idx" ON "_businesses_v_version_locations" USING btree ("_order");
  CREATE INDEX "_businesses_v_version_locations_parent_id_idx" ON "_businesses_v_version_locations" USING btree ("_parent_id");
  CREATE INDEX "_businesses_v_parent_idx" ON "_businesses_v" USING btree ("parent_id");
  CREATE INDEX "_businesses_v_version_version_logo_idx" ON "_businesses_v" USING btree ("version_logo_id");
  CREATE INDEX "_businesses_v_version_version_hero_image_idx" ON "_businesses_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_businesses_v_version_meta_version_meta_image_idx" ON "_businesses_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_businesses_v_version_version_slug_idx" ON "_businesses_v" USING btree ("version_slug");
  CREATE INDEX "_businesses_v_version_version_sector_idx" ON "_businesses_v" USING btree ("version_sector_id");
  CREATE INDEX "_businesses_v_version_version_updated_at_idx" ON "_businesses_v" USING btree ("version_updated_at");
  CREATE INDEX "_businesses_v_version_version_created_at_idx" ON "_businesses_v" USING btree ("version_created_at");
  CREATE INDEX "_businesses_v_version_version__status_idx" ON "_businesses_v" USING btree ("version__status");
  CREATE INDEX "_businesses_v_created_at_idx" ON "_businesses_v" USING btree ("created_at");
  CREATE INDEX "_businesses_v_updated_at_idx" ON "_businesses_v" USING btree ("updated_at");
  CREATE INDEX "_businesses_v_latest_idx" ON "_businesses_v" USING btree ("latest");
  CREATE INDEX "_businesses_v_autosave_idx" ON "_businesses_v" USING btree ("autosave");
  CREATE INDEX "_businesses_v_rels_order_idx" ON "_businesses_v_rels" USING btree ("order");
  CREATE INDEX "_businesses_v_rels_parent_idx" ON "_businesses_v_rels" USING btree ("parent_id");
  CREATE INDEX "_businesses_v_rels_path_idx" ON "_businesses_v_rels" USING btree ("path");
  CREATE INDEX "_businesses_v_rels_media_id_idx" ON "_businesses_v_rels" USING btree ("media_id");
  CREATE INDEX "sectors_image_idx" ON "sectors" USING btree ("image_id");
  CREATE UNIQUE INDEX "sectors_slug_idx" ON "sectors" USING btree ("slug");
  CREATE INDEX "sectors_updated_at_idx" ON "sectors" USING btree ("updated_at");
  CREATE INDEX "sectors_created_at_idx" ON "sectors" USING btree ("created_at");
  CREATE INDEX "news_hero_image_idx" ON "news" USING btree ("hero_image_id");
  CREATE INDEX "news_meta_meta_image_idx" ON "news" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_business_idx" ON "news" USING btree ("business_id");
  CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_sectors_id_idx" ON "news_rels" USING btree ("sectors_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_hero_image_idx" ON "_news_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_news_v_version_meta_version_meta_image_idx" ON "_news_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_business_idx" ON "_news_v" USING btree ("version_business_id");
  CREATE INDEX "_news_v_version_version_published_at_idx" ON "_news_v" USING btree ("version_published_at");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE INDEX "_news_v_autosave_idx" ON "_news_v" USING btree ("autosave");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_sectors_id_idx" ON "_news_v_rels" USING btree ("sectors_id");
  CREATE INDEX "impact_programmes_stats_order_idx" ON "impact_programmes_stats" USING btree ("_order");
  CREATE INDEX "impact_programmes_stats_parent_id_idx" ON "impact_programmes_stats" USING btree ("_parent_id");
  CREATE INDEX "impact_programmes_partners_order_idx" ON "impact_programmes_partners" USING btree ("_order");
  CREATE INDEX "impact_programmes_partners_parent_id_idx" ON "impact_programmes_partners" USING btree ("_parent_id");
  CREATE INDEX "impact_programmes_partners_logo_idx" ON "impact_programmes_partners" USING btree ("logo_id");
  CREATE INDEX "impact_programmes_hero_image_idx" ON "impact_programmes" USING btree ("hero_image_id");
  CREATE INDEX "impact_programmes_meta_meta_image_idx" ON "impact_programmes" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "impact_programmes_slug_idx" ON "impact_programmes" USING btree ("slug");
  CREATE INDEX "impact_programmes_business_idx" ON "impact_programmes" USING btree ("business_id");
  CREATE INDEX "impact_programmes_updated_at_idx" ON "impact_programmes" USING btree ("updated_at");
  CREATE INDEX "impact_programmes_created_at_idx" ON "impact_programmes" USING btree ("created_at");
  CREATE INDEX "impact_programmes__status_idx" ON "impact_programmes" USING btree ("_status");
  CREATE INDEX "impact_programmes_rels_order_idx" ON "impact_programmes_rels" USING btree ("order");
  CREATE INDEX "impact_programmes_rels_parent_idx" ON "impact_programmes_rels" USING btree ("parent_id");
  CREATE INDEX "impact_programmes_rels_path_idx" ON "impact_programmes_rels" USING btree ("path");
  CREATE INDEX "impact_programmes_rels_media_id_idx" ON "impact_programmes_rels" USING btree ("media_id");
  CREATE INDEX "_impact_programmes_v_version_stats_order_idx" ON "_impact_programmes_v_version_stats" USING btree ("_order");
  CREATE INDEX "_impact_programmes_v_version_stats_parent_id_idx" ON "_impact_programmes_v_version_stats" USING btree ("_parent_id");
  CREATE INDEX "_impact_programmes_v_version_partners_order_idx" ON "_impact_programmes_v_version_partners" USING btree ("_order");
  CREATE INDEX "_impact_programmes_v_version_partners_parent_id_idx" ON "_impact_programmes_v_version_partners" USING btree ("_parent_id");
  CREATE INDEX "_impact_programmes_v_version_partners_logo_idx" ON "_impact_programmes_v_version_partners" USING btree ("logo_id");
  CREATE INDEX "_impact_programmes_v_parent_idx" ON "_impact_programmes_v" USING btree ("parent_id");
  CREATE INDEX "_impact_programmes_v_version_version_hero_image_idx" ON "_impact_programmes_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_impact_programmes_v_version_meta_version_meta_image_idx" ON "_impact_programmes_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_impact_programmes_v_version_version_slug_idx" ON "_impact_programmes_v" USING btree ("version_slug");
  CREATE INDEX "_impact_programmes_v_version_version_business_idx" ON "_impact_programmes_v" USING btree ("version_business_id");
  CREATE INDEX "_impact_programmes_v_version_version_updated_at_idx" ON "_impact_programmes_v" USING btree ("version_updated_at");
  CREATE INDEX "_impact_programmes_v_version_version_created_at_idx" ON "_impact_programmes_v" USING btree ("version_created_at");
  CREATE INDEX "_impact_programmes_v_version_version__status_idx" ON "_impact_programmes_v" USING btree ("version__status");
  CREATE INDEX "_impact_programmes_v_created_at_idx" ON "_impact_programmes_v" USING btree ("created_at");
  CREATE INDEX "_impact_programmes_v_updated_at_idx" ON "_impact_programmes_v" USING btree ("updated_at");
  CREATE INDEX "_impact_programmes_v_latest_idx" ON "_impact_programmes_v" USING btree ("latest");
  CREATE INDEX "_impact_programmes_v_autosave_idx" ON "_impact_programmes_v" USING btree ("autosave");
  CREATE INDEX "_impact_programmes_v_rels_order_idx" ON "_impact_programmes_v_rels" USING btree ("order");
  CREATE INDEX "_impact_programmes_v_rels_parent_idx" ON "_impact_programmes_v_rels" USING btree ("parent_id");
  CREATE INDEX "_impact_programmes_v_rels_path_idx" ON "_impact_programmes_v_rels" USING btree ("path");
  CREATE INDEX "_impact_programmes_v_rels_media_id_idx" ON "_impact_programmes_v_rels" USING btree ("media_id");
  CREATE INDEX "leadership_photo_idx" ON "leadership" USING btree ("photo_id");
  CREATE INDEX "leadership_updated_at_idx" ON "leadership" USING btree ("updated_at");
  CREATE INDEX "leadership_created_at_idx" ON "leadership" USING btree ("created_at");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_text_order_idx" ON "pages_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_parent_id_idx" ON "pages_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_path_idx" ON "pages_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_services_grid_items_order_idx" ON "pages_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_items_parent_id_idx" ON "pages_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_items_image_idx" ON "pages_blocks_services_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_services_grid_order_idx" ON "pages_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_services_grid_parent_id_idx" ON "pages_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_services_grid_path_idx" ON "pages_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_media_id_idx" ON "pages_rels" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_services_grid_items_order_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_items_parent_id_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_items_image_idx" ON "_pages_v_blocks_services_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_services_grid_order_idx" ON "_pages_v_blocks_services_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_services_grid_parent_id_idx" ON "_pages_v_blocks_services_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_services_grid_path_idx" ON "_pages_v_blocks_services_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_media_id_idx" ON "_pages_v_rels" USING btree ("media_id");
  CREATE INDEX "enquiries_business_idx" ON "enquiries" USING btree ("business_id");
  CREATE INDEX "enquiries_status_idx" ON "enquiries" USING btree ("status");
  CREATE INDEX "enquiries_ip_hash_idx" ON "enquiries" USING btree ("ip_hash");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "media_business_idx" ON "media" USING btree ("business_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "users_tenants_order_idx" ON "users_tenants" USING btree ("_order");
  CREATE INDEX "users_tenants_parent_id_idx" ON "users_tenants" USING btree ("_parent_id");
  CREATE INDEX "users_tenants_tenant_idx" ON "users_tenants" USING btree ("tenant_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_businesses_id_idx" ON "redirects_rels" USING btree ("businesses_id");
  CREATE INDEX "redirects_rels_news_id_idx" ON "redirects_rels" USING btree ("news_id");
  CREATE INDEX "redirects_rels_impact_programmes_id_idx" ON "redirects_rels" USING btree ("impact_programmes_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_businesses_id_idx" ON "payload_locked_documents_rels" USING btree ("businesses_id");
  CREATE INDEX "payload_locked_documents_rels_sectors_id_idx" ON "payload_locked_documents_rels" USING btree ("sectors_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_impact_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("impact_programmes_id");
  CREATE INDEX "payload_locked_documents_rels_leadership_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_hero_hero_image_idx" ON "homepage" USING btree ("hero_image_id");
  CREATE INDEX "homepage_featured_impact_idx" ON "homepage" USING btree ("featured_impact_id");
  CREATE INDEX "homepage_chairman_chairman_portrait_idx" ON "homepage" USING btree ("chairman_portrait_id");
  CREATE INDEX "homepage__status_idx" ON "homepage" USING btree ("_status");
  CREATE INDEX "homepage_rels_order_idx" ON "homepage_rels" USING btree ("order");
  CREATE INDEX "homepage_rels_parent_idx" ON "homepage_rels" USING btree ("parent_id");
  CREATE INDEX "homepage_rels_path_idx" ON "homepage_rels" USING btree ("path");
  CREATE INDEX "homepage_rels_businesses_id_idx" ON "homepage_rels" USING btree ("businesses_id");
  CREATE INDEX "_homepage_v_version_hero_version_hero_image_idx" ON "_homepage_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_homepage_v_version_version_featured_impact_idx" ON "_homepage_v" USING btree ("version_featured_impact_id");
  CREATE INDEX "_homepage_v_version_chairman_version_chairman_portrait_idx" ON "_homepage_v" USING btree ("version_chairman_portrait_id");
  CREATE INDEX "_homepage_v_version_version__status_idx" ON "_homepage_v" USING btree ("version__status");
  CREATE INDEX "_homepage_v_created_at_idx" ON "_homepage_v" USING btree ("created_at");
  CREATE INDEX "_homepage_v_updated_at_idx" ON "_homepage_v" USING btree ("updated_at");
  CREATE INDEX "_homepage_v_latest_idx" ON "_homepage_v" USING btree ("latest");
  CREATE INDEX "_homepage_v_autosave_idx" ON "_homepage_v" USING btree ("autosave");
  CREATE INDEX "_homepage_v_rels_order_idx" ON "_homepage_v_rels" USING btree ("order");
  CREATE INDEX "_homepage_v_rels_parent_idx" ON "_homepage_v_rels" USING btree ("parent_id");
  CREATE INDEX "_homepage_v_rels_path_idx" ON "_homepage_v_rels" USING btree ("path");
  CREATE INDEX "_homepage_v_rels_businesses_id_idx" ON "_homepage_v_rels" USING btree ("businesses_id");
  CREATE INDEX "media_kit_logos_order_idx" ON "media_kit_logos" USING btree ("_order");
  CREATE INDEX "media_kit_logos_parent_id_idx" ON "media_kit_logos" USING btree ("_parent_id");
  CREATE INDEX "media_kit_logos_file_idx" ON "media_kit_logos" USING btree ("file_id");
  CREATE INDEX "media_kit_brand_guidelines_idx" ON "media_kit" USING btree ("brand_guidelines_id");
  CREATE INDEX "site_settings_stats_order_idx" ON "site_settings_stats" USING btree ("_order");
  CREATE INDEX "site_settings_stats_parent_id_idx" ON "site_settings_stats" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "businesses_services" CASCADE;
  DROP TABLE "businesses_stats" CASCADE;
  DROP TABLE "businesses_blocks_rates_table_rates" CASCADE;
  DROP TABLE "businesses_blocks_rates_table" CASCADE;
  DROP TABLE "businesses_blocks_loan_products_products" CASCADE;
  DROP TABLE "businesses_blocks_loan_products_requirements" CASCADE;
  DROP TABLE "businesses_blocks_loan_products" CASCADE;
  DROP TABLE "businesses_blocks_product_list_products" CASCADE;
  DROP TABLE "businesses_blocks_product_list" CASCADE;
  DROP TABLE "businesses_blocks_rooms_rooms" CASCADE;
  DROP TABLE "businesses_blocks_rooms_amenities" CASCADE;
  DROP TABLE "businesses_blocks_rooms" CASCADE;
  DROP TABLE "businesses_blocks_faq_items" CASCADE;
  DROP TABLE "businesses_blocks_faq" CASCADE;
  DROP TABLE "businesses_blocks_cta" CASCADE;
  DROP TABLE "businesses_blocks_rich_text" CASCADE;
  DROP TABLE "businesses_locations" CASCADE;
  DROP TABLE "businesses" CASCADE;
  DROP TABLE "businesses_rels" CASCADE;
  DROP TABLE "_businesses_v_version_services" CASCADE;
  DROP TABLE "_businesses_v_version_stats" CASCADE;
  DROP TABLE "_businesses_v_blocks_rates_table_rates" CASCADE;
  DROP TABLE "_businesses_v_blocks_rates_table" CASCADE;
  DROP TABLE "_businesses_v_blocks_loan_products_products" CASCADE;
  DROP TABLE "_businesses_v_blocks_loan_products_requirements" CASCADE;
  DROP TABLE "_businesses_v_blocks_loan_products" CASCADE;
  DROP TABLE "_businesses_v_blocks_product_list_products" CASCADE;
  DROP TABLE "_businesses_v_blocks_product_list" CASCADE;
  DROP TABLE "_businesses_v_blocks_rooms_rooms" CASCADE;
  DROP TABLE "_businesses_v_blocks_rooms_amenities" CASCADE;
  DROP TABLE "_businesses_v_blocks_rooms" CASCADE;
  DROP TABLE "_businesses_v_blocks_faq_items" CASCADE;
  DROP TABLE "_businesses_v_blocks_faq" CASCADE;
  DROP TABLE "_businesses_v_blocks_cta" CASCADE;
  DROP TABLE "_businesses_v_blocks_rich_text" CASCADE;
  DROP TABLE "_businesses_v_version_locations" CASCADE;
  DROP TABLE "_businesses_v" CASCADE;
  DROP TABLE "_businesses_v_rels" CASCADE;
  DROP TABLE "sectors" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "impact_programmes_stats" CASCADE;
  DROP TABLE "impact_programmes_partners" CASCADE;
  DROP TABLE "impact_programmes" CASCADE;
  DROP TABLE "impact_programmes_rels" CASCADE;
  DROP TABLE "_impact_programmes_v_version_stats" CASCADE;
  DROP TABLE "_impact_programmes_v_version_partners" CASCADE;
  DROP TABLE "_impact_programmes_v" CASCADE;
  DROP TABLE "_impact_programmes_v_rels" CASCADE;
  DROP TABLE "leadership" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_rich_text" CASCADE;
  DROP TABLE "pages_blocks_services_grid_items" CASCADE;
  DROP TABLE "pages_blocks_services_grid" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_services_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_tenants" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "homepage_rels" CASCADE;
  DROP TABLE "_homepage_v" CASCADE;
  DROP TABLE "_homepage_v_rels" CASCADE;
  DROP TABLE "media_kit_logos" CASCADE;
  DROP TABLE "media_kit" CASCADE;
  DROP TABLE "site_settings_stats" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_businesses_blocks_cta_style";
  DROP TYPE "public"."enum_businesses_locations_district";
  DROP TYPE "public"."enum_businesses_status";
  DROP TYPE "public"."enum__businesses_v_blocks_cta_style";
  DROP TYPE "public"."enum__businesses_v_version_locations_district";
  DROP TYPE "public"."enum__businesses_v_version_status";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum_impact_programmes_pillar";
  DROP TYPE "public"."enum_impact_programmes_status";
  DROP TYPE "public"."enum__impact_programmes_v_version_pillar";
  DROP TYPE "public"."enum__impact_programmes_v_version_status";
  DROP TYPE "public"."enum_leadership_group";
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_enquiries_type";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_homepage_status";
  DROP TYPE "public"."enum__homepage_v_version_status";`)
}
