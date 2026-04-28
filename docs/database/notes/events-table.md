# Events Table

## Purpose
The `events` table stores the data needed for the platform’s event feature.
It keeps each event in a structured format so that events can be listed, searched, filtered, and displayed consistently in the application.

## Table Overview

| Column Name | Data Type | Description |
|------------|-----------|-------------|
| `id` | `uuid` | Unique identifier for each event record |
| `title` | `text` | The name of the event |
| `category` | `text` | The type of event, for example academic, social, careers, or sports |
| `description` | `text` | A fuller explanation of the event and what it is about |
| `location` | `text` | The place where the event is taking place |
| `event_date` | `timestamptz` | The date and time of the event, including time zone support |
| `created_at` | `timestamptz` | The timestamp showing when the event record was created |

## Primary Key
- `id`

## Why this table is important
The `events` table is one of the core tables in the system because it supports the event listing functionality for students.
Without this table, the platform would not be able to store and retrieve event information in a reliable way.

This table is useful because it:
- stores event information in one place
- supports the event page in the application
- allows future filtering by category, date, or location
- helps keep the system organised and scalable

## Design Notes
The choice of `uuid` for the `id` field helps ensure that each event has a unique identifier.
Using `text` for descriptive fields such as `title`, `category`, `description`, and `location` keeps the design flexible and easy to extend.
The use of `timestamptz` for `event_date` and `created_at` is important because it allows the system to store date and time values with time zone support, which is more reliable for modern web applications.

## Example Use in the System
When a user opens the events page, the application can retrieve records from the `events` table and display information such as:
- event title
- event category
- event description
- location
- date and time

This means the table directly supports one of the visible user features of the platform.

## Future Improvements
Possible future improvements for this table include:
- adding a `created_by` field to link events to the user who submitted them
- adding an `approved` field for admin moderation
- adding an event image or poster field
- adding attendance or booking support
- adding status fields such as active, cancelled, or completed

## Summary
Overall, the `events` table provides the core structure needed to manage event data in the system.
It is simple, effective, and supports both the current platform requirements and future development.