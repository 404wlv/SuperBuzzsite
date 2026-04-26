-- WARNING: This schema is for context only on what is going on in Supabase and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.daily_checkins (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  last_checkin date,
  streak smallint,
  reward_claimed boolean,
  CONSTRAINT daily_checkins_pkey PRIMARY KEY (id)
);

CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  location text NOT NULL,
  event_date timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);

CREATE TABLE public.faqs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  keywords text NOT NULL,
  answer text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT faqs_pkey PRIMARY KEY (id)
);

CREATE TABLE public.profiles (
  id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  email text NOT NULL,
  display_name text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

 Schema Notes

This schema reference documents the current Supabase table structure used by the SuperBuzzsite project.

## Tables currently included
- `profiles`
- `faqs`
- `daily_checkins`
- `events`

## Notes
- `profiles` is linked to `auth.users.id`
- `faqs` supports chatbot / FAQ responses
- `daily_checkins` supports the daily streak feature
- `events` supports database-backed event loading and creation in `home.js`

This file is included as backend/database evidence and as a reference for current schema structure.
About the convo with Danial