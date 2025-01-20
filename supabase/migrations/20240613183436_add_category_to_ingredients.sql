ALTER TABLE "public"."ingredients" ADD COLUMN "category_id" bigint REFERENCES "public"."categories"("id");
