-- The Arch admin area: run this once in Supabase (SQL Editor > paste > Run).
-- Safe to run again: every statement checks before it creates.

-- 1. The edits made in /admin. Edits written in code (data/edits.ts) are not here.
create table if not exists public.cms_edits (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null default 'draft' check (status in ('draft', 'published')),
  title text not null default '',
  section text not null default 'outfits' check (section in ('outfits', 'nursery', 'gifts')),
  intro text not null default '',
  search_title text not null default '',
  description text not null default '',
  season text not null default '',
  note text not null default '',
  instagram text not null default '',
  board_image text,
  -- 'outfit' adds the pieces up into one total; 'shortlist' shows a price range.
  look_kind text not null default 'outfit' check (look_kind in ('outfit', 'shortlist')),
  products jsonb not null default '[]'::jsonb,
  -- Set by hand-style rules in the admin: first publish date, and last real change.
  published_on date,
  updated_on date,
  created_at timestamptz not null default now(),
  modified_at timestamptz not null default now()
);

-- Nothing in the browser may touch this table. Row level security on with no
-- policies means only the server (using the secret key) can read or write it.
alter table public.cms_edits enable row level security;

-- 2. Failed login attempts, so the password can't be guessed by trying forever.
create table if not exists public.admin_attempts (
  id bigserial primary key,
  at timestamptz not null default now()
);
alter table public.admin_attempts enable row level security;

-- Newer Supabase projects don't give the server's role access to new tables
-- automatically, so say so. (Browsers still can't touch them: RLS is on and
-- there are no policies for the public roles.)
grant usage on schema public to service_role;
grant all on public.cms_edits to service_role;
grant all on public.admin_attempts to service_role;
grant usage, select on sequence public.admin_attempts_id_seq to service_role;

-- 3. Where uploaded boards live. Public to read (they are shown on the site),
-- PNG only (the social image maker can't read anything else), 8 MB at most. Only the server can add to it.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('edit-images', 'edit-images', true, 8388608, array['image/png'])
on conflict (id) do update
  set public = true,
      file_size_limit = 8388608,
      allowed_mime_types = array['image/png'];
