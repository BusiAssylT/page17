drop policy if exists "anonymous receipt upload" on storage.objects;

create policy "anonymous receipt upload"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'receipts'
  and (storage.foldername(name))[1] is null
);
