-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.bosses (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  chapter integer,
  description text,
  strategy text NOT NULL,
  weaknesses jsonb,
  rewards jsonb,
  health integer,
  image_url text,
  video_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bosses_pkey PRIMARY KEY (id)
);
CREATE TABLE public.chapters (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  chapter_number integer NOT NULL UNIQUE,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  content text NOT NULL,
  thumbnail_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chapters_pkey PRIMARY KEY (id)
);
CREATE TABLE public.favorites (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT favorites_pkey PRIMARY KEY (id),
  CONSTRAINT favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.maps (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  image_url text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  show boolean,
  CONSTRAINT maps_pkey PRIMARY KEY (id)
);
CREATE TABLE public.merchant_requests (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  chapter integer,
  description text NOT NULL,
  reward text,
  solution text,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT merchant_requests_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pin_categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  color text NOT NULL DEFAULT '#ffffff'::text,
  icon text,
  visible boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT pin_categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.pins (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  map_id uuid,
  category_id uuid,
  x double precision NOT NULL,
  y double precision NOT NULL,
  title text,
  description text,
  image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  Chapter text,
  target_map_id uuid,
  CONSTRAINT pins_pkey PRIMARY KEY (id),
  CONSTRAINT pins_map_id_fkey FOREIGN KEY (map_id) REFERENCES public.maps(id),
  CONSTRAINT pins_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.pin_categories(id),
  CONSTRAINT pins_target_map_id_fkey FOREIGN KEY (target_map_id) REFERENCES public.maps(id)
);
CREATE TABLE public.puzzles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  chapter integer,
  location text,
  solution text NOT NULL,
  difficulty text,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT puzzles_pkey PRIMARY KEY (id)
);
CREATE TABLE public.treasures (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type text,
  value integer NOT NULL,
  location text NOT NULL,
  chapter integer,
  description text,
  image_url uuid,
  map_coordinates jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT treasures_pkey PRIMARY KEY (id)
);
CREATE TABLE public.treasures_image (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  Picture text,
  treasure_id uuid,
  CONSTRAINT treasures_image_pkey PRIMARY KEY (id),
  CONSTRAINT treasures_image_treasure_id_fkey FOREIGN KEY (treasure_id) REFERENCES public.treasures(id)
);
CREATE TABLE public.weapons (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type text NOT NULL,
  description text,
  stats jsonb,
  upgrade_path jsonb,
  location text,
  cost integer,
  image_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT weapons_pkey PRIMARY KEY (id)
);