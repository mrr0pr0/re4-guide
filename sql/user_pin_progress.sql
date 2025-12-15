-- Tracks which pins a user has marked as found
create table if not exists user_pin_progress (
  user_id uuid references auth.users(id) on delete cascade,
  map_id uuid references maps(id) on delete cascade,
  pin_id uuid references pins(id) on delete cascade,
  found boolean default true,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, pin_id)
);

alter table user_pin_progress enable row level security;

create policy "Users can manage their own progress" on user_pin_progress
  for all using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

