# Profile System Flow Diagram

## Purpose

This diagram shows how the profile feature works across the SuperBuzz platform, linking the authenticated user, the profiles table, and the profile page interface.

It reflects the implemented logic where user-linked profile data is stored in Supabase and then displayed or updated through the frontend.

---

## System Architecture

```text
+----------------------+
|     User Device      |
|  (Mobile / Desktop)  |
+----------+-----------+
           |
           v
+-------------------------------+
| Frontend (HTML + JS Modules)  |
| - profile.html                |
| - profile.js                  |
+---------------+---------------+
                |
                | User opens profile page
                v
+-------------------------------+
|     Supabase Auth Service     |
| - validates active session    |
| - identifies logged-in user   |
+---------------+---------------+
                |
                v
+-------------------------------+
|     Supabase Database         |
|     Table: profiles           |
|                               |
| Fields used:                  |
| - id                          |
| - email                       |
| - display_name                |
| - created_at                  |
+---------------+---------------+
                |
                | read / update profile data
                v
+-------------------------------+
| Frontend UI Update            |
| - loads profile details       |
| - fills display name          |
| - shows email and stats       |
+---------------+---------------+
                |
                v
+-------------------------------+
| User Feedback                 |
| - personalised profile view   |
| - saved profile changes       |
+-------------------------------+