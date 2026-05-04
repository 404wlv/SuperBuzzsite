# Schema Notes

This document explains the current Supabase database structure used by the SuperBuzzsite project.

It is written as a simple reference for both technical and non-technical readers, so that the purpose of each table and the logic behind the reward system can be understood more clearly.

---

## Current Tables

The current database structure includes the following tables:

- `profiles`
- `faqs`
- `daily_checkins`
- `events`
- `event_attendance`

---

## Why these tables exist

### `profiles`
This table stores user profile information.

It is used for:
- displaying account information on the profile page
- storing the user email
- storing the display name
- linking each profile to the authenticated user account

Important note:
- `profiles.id` is linked to `auth.users.id`

This means every profile belongs to one logged-in user.

---

### `faqs`
This table stores FAQ content used by the chatbot / support feature.

It is used for:
- keyword-based question matching
- returning stored answers when users ask common questions

This supports the help and information side of the application.

---

### `daily_checkins`
This table stores a user's daily check-in activity.

It is used for:
- tracking the user's most recent check-in date
- tracking their current streak
- tracking whether a reward has been claimed
- storing the total number of check-ins completed

Important columns:
- `last_checkin`
- `streak`
- `reward_claimed`
- `total_checkins`

This table is one of the main sources used in the reward / points system.

---

### `events`
This table stores event information shown in the app.

It is used for:
- loading events into the home page
- storing title, category, description, location, and event date
- allowing users to create events through the interface
- linking events to the user who created them

Important note:
- `created_by` stores the user who created the event

This helps the profile page count how many events a user has created.

---

### `event_attendance`
This table links users to events they attend.

It is used for:
- recording when a user registers for or attends an event
- preventing attendance data from being mixed into the main `events` table
- supporting the profile page's "attended" value
- feeding part of the reward / points system

Important idea:
- one event can have many attendees
- one user can attend many events

This table acts as the link between users and events.

---

## Key Relationships

The main relationships in the current schema are:

- `profiles.id` -> `auth.users.id`
- `events.created_by` -> authenticated user identity
- `event_attendance.event_id` -> `events.id`
- `event_attendance.user_id` -> authenticated user identity
- `daily_checkins.user_id` -> authenticated user identity

These relationships allow the project to connect:
- who the user is
- what events they created
- what events they attended
- how often they check in
- how many reward points they have earned

---

## Reward System Logic

The reward system does not rely on only one table.

Instead, it combines activity data from several parts of the database.

### Current data sources
The profile and reward logic currently uses:

- `daily_checkins.total_checkins`
- `events.created_by`
- `event_attendance.user_id`

### Meaning of the values
- `dcp` = daily check-in points
- `ecp` = events created count
- `eap` = events attended count

### Current formula
`total_points = dcp + (ecp * 50) + (eap * 20)`

This means:
- each daily check-in contributes to engagement points
- creating events has a higher value because it represents contribution to campus activity
- attending events also increases a user's engagement score

---

## Why this matters

This structure supports several important project goals:

- it keeps user profile data organised
- it separates event creation from event attendance
- it makes the reward system more flexible
- it allows the profile page to display live user activity
- it provides a clearer structure for future improvements

Examples of future improvements could include:
- storing claimed coupons or redeemed rewards
- adding more reward categories
- tracking attendance history more deeply
- improving reporting and analytics

---

## Evidence Value

This schema documentation is useful as project evidence because it shows:

- the current backend structure
- how database tables support live features in the app
- how the reward system is connected across multiple tables
- how the project moved from basic storage to linked feature logic

It also helps align the repository, database, and demonstration by making the structure easier to explain during the MMP presentation and in the individual contribution report.