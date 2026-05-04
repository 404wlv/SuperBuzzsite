# Events Table

## Purpose
The `events` table stores the data needed for the platform’s event feature. It keeps each event in a structured format so that events can be listed, searched, filtered, and displayed consistently in the application.

---

## Table Overview

| Column Name | Data Type   | Description |
|------------|-------------|-------------|
| id         | uuid        | Unique identifier for each event record |
| title      | text        | The name of the event |
| category   | text        | The type of event, for example academic, social, careers, or sports |
| description| text        | A fuller explanation of the event and what it is about |
| location   | text        | The place where the event is taking place |
| event_date | timestamptz | The date and time of the event, including time zone support |
| created_at | timestamptz | The timestamp showing when the event record was created |
| created_by | uuid        | The user who created the event, linked to the authenticated user |

---

## Primary Key
`id`

---

## Why this table is important
The `events` table is one of the core tables in the system because it supports the event listing and event creation functionality for students. Without this table, the platform would not be able to store and retrieve event information in a reliable way.

This table is useful because it:

- stores event information in one place
- supports the event page in the application
- allows events to be created dynamically by logged-in users
- supports future filtering by category, date, or location
- helps keep the system organised and scalable

---

## Design Notes
The choice of `uuid` for the `id` field helps ensure that each event has a unique identifier. Using `text` for the descriptive fields such as `title`, `category`, `description`, and `location` keeps the design flexible and easy to extend.

The use of `timestamptz` for `event_date` and `created_at` is important because it allows the system to store date and time values with time zone support, which is more reliable for modern web applications.

The `created_by` field is also important because it links the event back to the user who created it, which supports accountability, ownership, and future moderation features.

---

## Example Use in the System
When a user opens the events page, the application can retrieve records from the `events` table and display information such as:

- event title
- event category
- event description
- location
- date and time

When a logged-in user creates a new event, the application inserts a new record into the `events` table and stores their user ID in the `created_by` field.

This means the table directly supports both the visible event listing and the event creation feature in the platform.

---

## Relationship to Other Tables
The `events` table connects with other parts of the system:

- `profiles` / `auth.users` through `created_by`
- `event_attendance` through `event_id`

This means one event can have many attendance records linked to it.

---

## Future Improvements
Possible future improvements for this table include:

- adding an `approved` field for admin moderation
- adding an event image or poster field
- adding status values such as active, cancelled, or completed
- adding event capacity limits
- adding tags for more detailed search and filtering

---

## Summary
Overall, the `events` table provides the core structure needed to manage event data in the system. It supports both the current platform requirements and future development, especially as the event feature becomes more interactive and user-driven.