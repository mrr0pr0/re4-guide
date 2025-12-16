-- 1) Create an admins table linked to auth.users
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- 2) Row level security: only admins can do writes on content tables (example: weapons)
alter table weapons enable row level security;

create policy "Admins can manage weapons"
on weapons
for all
using (exists (
  select 1 from admins a
  where a.user_id = auth.uid()
));

-- 3) After you create a user in the Auth UI, plug their id here:
insert into admins (user_id)
values ('3bca8bd3-d284-4e01-a458-be679c33a432');