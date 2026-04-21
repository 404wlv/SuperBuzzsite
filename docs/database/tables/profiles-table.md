# Profiles Table

## Purpose
The `profiles` table stores profile information for authenticated users in the SuperBuzzsite application.

## Main Fields
- `id` – unique user identifier
- `created_at` – timestamp showing when the profile record was created
- `email` – stores the user email address
- `display_name` – stores the user's display name

## Relationship
- `profiles.id` is linked to `auth.users.id`
- this means each profile belongs to an authenticated user account

## Role in the System
This table supports user account-related functionality by storing profile data that can be accessed after authentication.

## Notes
The table is part of the backend structure created in Supabase and helps connect authentication with user profile information used by the application.

## Security
Row Level Security (RLS) can be applied to this table so that users only access profile data they are authorised to view or manage. Appropriate policies were researched and applied with reference to security guidance within the project. Further updates to the table structure or security controls can be documented as the system develops.