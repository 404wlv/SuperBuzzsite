-- WARNING: This schema reference is for documentation only.
-- It reflects the current Supabase structure used by the SuperBuzzsite project.
-- It is not intended to be executed directly, and table order / constraints may
-- need adjustment if used in a live migration script.

CREATE TABLE public.daily_checkins (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT gen_random_uuid(),
  last_checkin date,
  streak smallint,
  reward_claimed boolean,
  total_checkins integer,
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
  created_by uuid,
  CONSTRAINT events_pkey PRIMARY KEY (id)
);

CREATE TABLE public.event_attendance (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT event_attendance_pkey PRIMARY KEY (id)
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
  profile_picture text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

-- Relationship summary
-- profiles.id -> auth.users.id
-- events.created_by -> auth.users.id / user profile identity
-- event_attendance.event_id -> events.id
-- event_attendance.user_id -> auth.users.id / user profile identity
-- daily_checkins.user_id -> auth.users.id / user profile identity

-- Feature summary
-- profiles:
-- stores user identity details shown on the profile page

-- faqs:
-- stores chatbot FAQ responses and keyword matching content

-- events:
-- stores event records displayed on the home page and supports user-created events

-- event_attendance:
-- links users to events they have registered for or attended

-- daily_checkins:
-- stores daily check-in progress, streak data, reward state, and total check-in count

-- Reward / profile logic context
-- The profile and reward system reads from multiple tables:
-- 1. daily_checkins.total_checkins -> daily check-in activity
-- 2. events.created_by -> number of events created by a user
-- 3. event_attendance.user_id -> number of events attended by a user

-- Current points formula used in the project logic:
-- total_points = dcp + (ecp * 50) + (eap * 20)
--
-- dcp = daily check-in points
-- ecp = events created count
-- eap = events attended count