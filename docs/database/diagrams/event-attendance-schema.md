
---

## `event-attendance-schema.md`

```md
# Event Attendance System Flow Diagram

## Purpose

This diagram shows how the event attendance feature works across the SuperBuzz platform, linking selected events, authenticated users, and attendance records in the database.

It reflects the implemented logic where attendance is stored as a linking record between a user and an event.

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
| - home.html                   |
| - home.js                     |
+---------------+---------------+
                |
                | User selects event / submits attendance form
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
|     Table: event_attendance   |
|                               |
| Fields used:                  |
| - id                          |
| - event_id                    |
| - user_id                     |
| - created_at                  |
+---------------+---------------+
                |
                | insert attendance record
                v
+-------------------------------+
| Frontend UI Update            |
| - attendance confirmed        |
| - form closes                 |
| - duplicate blocked if needed |
+---------------+---------------+
                |
                v
+-------------------------------+
| User Feedback                 |
| - registration success        |
| - duplicate warning shown     |
+-------------------------------+