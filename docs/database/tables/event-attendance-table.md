# Event Attendance Table

## Purpose
The `event_attendance` table stores the relationship between users and events. It records which users have registered interest in or chosen to attend a particular event.

This table supports the attendance feature in the platform and links users to event records in a structured way.

---

## Table Overview

| Column Name | Data Type   | Description |
|------------|-------------|-------------|
| id         | uuid        | Unique identifier for each attendance record |
| event_id   | uuid        | References the event the user is attending |
| user_id    | uuid        | References the authenticated user attending the event |
| created_at | timestamptz | Timestamp showing when the attendance record was created |

---

## Primary Key
`id`

---

## Why this table is important
This table is important because it allows the system to track attendance without duplicating user or event information inside the `events` table itself.

It is useful because it:

- links users to events
- supports the event registration flow
- allows attendance to be counted and analysed
- keeps the database normalised and scalable

---

## How it works in the system

1. User opens an event
2. User clicks **Attend Event**
3. User fills in the form
4. System checks:
   - user is logged in
   - an event has been selected
   - the user has not already registered
5. If valid:
   - a new record is inserted into `event_attendance`
   - `event_id` links to the selected event
   - `user_id` links to the logged-in user

---

## Design Notes
This table acts as a link table between users and events. It is a good database design choice because one user can attend many events, and one event can have many users attending it.

This creates a many-to-many relationship between users and events.

---

## Possible Validation
A uniqueness rule can be used to prevent the same user from registering for the same event more than once.

For example:
- one `user_id` should not have duplicate entries for the same `event_id`

This is already reflected in the frontend logic where duplicate registration attempts are blocked.

---

## Future Improvements
Possible future improvements include:

- storing attendance status such as registered, attended, or cancelled
- storing extra form details in a separate linked table if needed
- adding QR check-in for real attendance confirmation
- allowing event organisers to export attendance lists

---

## Summary
The `event_attendance` table is an important supporting table for the platform’s event feature. It keeps attendance data organised, links users to events properly, and supports future reporting and analytics.