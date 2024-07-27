create policy "all-see 1ip0jqj_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'pizzas'::text));


create policy "auth-upload 1ip0jqj_0"
on "storage"."objects"
as permissive
for insert
to authenticated
with check ((bucket_id = 'pizzas'::text));



