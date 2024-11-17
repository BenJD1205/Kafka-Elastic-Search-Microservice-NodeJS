CREATE TABLE IF NOT EXISTS "order_line_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_name" varchar NOT NULL,
	"qty" integer NOT NULL,
	"amount" numeric NOT NULL,
	"order_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "carts" DROP CONSTRAINT "carts_customer_id_unique";--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "order_number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "amount" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "status" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "carts" ADD COLUMN "txn_id" varchar NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_line_items" ADD CONSTRAINT "order_line_items_order_id_carts_id_fk" FOREIGN KEY ("order_id") REFERENCES "carts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_order_number_unique" UNIQUE("order_number");