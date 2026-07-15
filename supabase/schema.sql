create extension if not exists pgcrypto;

create table if not exists public.organizers (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  application_number bigint generated always as identity unique,
  full_name text not null check (char_length(full_name) between 3 and 100),
  whatsapp text not null check (whatsapp ~ '^7[0-9]{10}$'),
  receipt_path text not null unique,
  status text not null default 'pending' check (status in ('pending','issued','rejected')),
  serial_number text unique,
  ticket_token uuid unique,
  checked_in_at timestamptz,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id)
);

alter table public.organizers enable row level security;
alter table public.registrations enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 5242880, array['image/jpeg','image/png','application/pdf'])
on conflict (id) do update set public=false, file_size_limit=5242880, allowed_mime_types=excluded.allowed_mime_types;

drop policy if exists "anonymous receipt upload" on storage.objects;
create policy "anonymous receipt upload" on storage.objects for insert to anon, authenticated
with check (bucket_id='receipts' and (storage.foldername(name))[1] is null);

create or replace function public.is_organizer() returns boolean language sql stable security definer set search_path=public as $$
  select exists(select 1 from public.organizers where user_id=auth.uid())
$$;

drop policy if exists "organizers read receipts" on storage.objects;
create policy "organizers read receipts" on storage.objects for select to authenticated
using (bucket_id='receipts' and public.is_organizer());

create or replace function public.create_registration(p_full_name text, p_whatsapp text, p_receipt_path text)
returns bigint language plpgsql security definer set search_path=public as $$
declare n bigint;
begin
  perform pg_advisory_xact_lock(17082026);
  if (select count(*) from registrations where status in ('pending','issued')) >= 60 then raise exception 'sold_out'; end if;
  insert into registrations(full_name,whatsapp,receipt_path)
  values(trim(p_full_name),p_whatsapp,p_receipt_path) returning application_number into n;
  return n;
end $$;
grant execute on function public.create_registration(text,text,text) to anon;

create or replace function public.get_public_ticket(p_token uuid)
returns table(full_name text,serial_number text,checked_in_at timestamptz) language sql security definer set search_path=public as $$
  select r.full_name,r.serial_number,r.checked_in_at from registrations r where r.ticket_token=p_token and r.status='issued'
$$;
grant execute on function public.get_public_ticket(uuid) to anon;

create or replace function public.admin_list_registrations()
returns table(id uuid,application_number bigint,full_name text,whatsapp text,receipt_path text,status text,serial_number text,ticket_token uuid,checked_in_at timestamptz,created_at timestamptz) language plpgsql security definer set search_path=public as $$
begin
  if not is_organizer() then raise exception 'forbidden'; end if;
  return query select r.id,r.application_number,r.full_name,r.whatsapp,r.receipt_path,r.status,r.serial_number,r.ticket_token,r.checked_in_at,r.created_at from registrations r order by r.created_at desc;
end $$;
grant execute on function public.admin_list_registrations() to authenticated;

create or replace function public.approve_registration(p_registration_id uuid)
returns void language plpgsql security definer set search_path=public as $$
declare next_number integer;
begin
  if not is_organizer() then raise exception 'forbidden'; end if;
  perform pg_advisory_xact_lock(17082026);
  if (select count(*) from registrations where status='issued') >= 60 then raise exception 'sold_out'; end if;
  select coalesce(max(substring(serial_number from '[0-9]+$')::integer),0)+1 into next_number from registrations where serial_number is not null;
  update registrations set status='issued',serial_number='P17-2026-'||lpad(next_number::text,4,'0'),ticket_token=gen_random_uuid(),reviewed_at=now(),reviewed_by=auth.uid() where id=p_registration_id and status='pending';
end $$;
grant execute on function public.approve_registration(uuid) to authenticated;

create or replace function public.reject_registration(p_registration_id uuid)
returns void language plpgsql security definer set search_path=public as $$
begin
  if not is_organizer() then raise exception 'forbidden'; end if;
  update registrations set status='rejected',reviewed_at=now(),reviewed_by=auth.uid() where id=p_registration_id and status='pending';
end $$;
grant execute on function public.reject_registration(uuid) to authenticated;

create or replace function public.check_in_ticket(p_token uuid)
returns table(full_name text,was_already_used boolean) language plpgsql security definer set search_path=public as $$
declare used timestamptz; attendee text;
begin
  if not is_organizer() then raise exception 'forbidden'; end if;
  select r.full_name,r.checked_in_at into attendee,used from registrations r where r.ticket_token=p_token and r.status='issued' for update;
  if attendee is null then return; end if;
  if used is null then update registrations set checked_in_at=now() where ticket_token=p_token; end if;
  return query select attendee,(used is not null);
end $$;
grant execute on function public.check_in_ticket(uuid) to authenticated;

revoke all on public.registrations from anon,authenticated;
revoke all on public.organizers from anon,authenticated;
