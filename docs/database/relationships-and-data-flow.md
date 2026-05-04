# Relationships and Data Flow

## Purpose

This document explains how the main database tables in SuperBuzz connect to each other and how data moves between the frontend, authentication system, and database layer.

The purpose of this file is to show that the database was not only designed as a set of isolated tables, but also implemented as part of the application workflow. This is important because the value of a database in a web platform is not only in how it stores data, but also in how it supports our features, user actions, and secure interactions across the app.

---

## Main Table Relationships

The current system includes the following main tables:

- `profiles`
- `events`
- `event_attendance`
- `daily_checkins`
- `faqs`

These tables support different features, but they also connect through the application’s user and feature flows.

---

## 1. `profiles` and Authentication

The `profiles` table is linked to Supabase authentication through the user ID.

### Relationship
- `profiles.id` → linked to `auth.users.id`

### Why this matters
This relationship allows each authenticated user to have profile-related data stored separately from the authentication system itself. This keeps the system more organised while still linking each user to their own profile information.

### Supports features such as:
- display name
- profile information
- user-linked stats
- future personalisation

---

## 2. `events` and Authenticated Users

The `events` table stores event records created or displayed in the application.

### Relationship
- `events.created_by` → linked to the authenticated user who created the event

### Why this matters
This relationship allows events to be tied to a specific user. It improves traceability, supports ownership, and can help future moderation or admin review processes.

### Supports features such as:
- dynamic event creation
- event ownership
- displaying upcoming events
- future moderation or auditing

---

## 3. `event_attendance` as a Linking Table

The `event_attendance` table connects users to events they choose to attend.

### Relationships
- `event_attendance.event_id` → links to `events.id`
- `event_attendance.user_id` → links to the authenticated user

### Why this matters
This table supports a many-to-many relationship:

- one user can attend many events
- one event can have many users attending

This is better database design than trying to store attendance directly inside the `events` table. It keeps the structure more scalable and avoids duplication.

### Supports features such as:
- attendance registration
- duplicate attendance prevention
- future attendance reporting
- future engagement analytics

---

## 4. `daily_checkins` and User Engagement

The `daily_checkins` table stores engagement information for each user.

### Relationship
- `daily_checkins.user_id` → linked to the authenticated user

### Why this matters
This allows each user’s check-in history, streak, and total check-ins to be stored individually. It supports persistence, meaning the system remembers the user’s progress even after the page is refreshed or revisited.

### Supports features such as:
- daily streak tracking
- total check-in count
- reward progress logic
- future reward redemption systems

---

## 5. `faqs` and the Chatbot

The `faqs` table is not strongly relational in the same way as the other tables, but it still supports an important feature in the application.

### Data use
- `faqs.answer`
- `faqs.keywords`

### Why this matters
Rather than being hardcoded directly into the interface, FAQ responses are stored in the database and loaded into the app. This means the chatbot logic is supported by editable data rather than fixed frontend text.

### Supports features such as:
- basic chatbot response logic
- keyword matching
- future FAQ expansion without editing the main interface logic

---

## Data Flow Across the Application

The database supports multiple flows across the platform. These flows show how user actions connect to stored data.

---

## Flow 1: Profile Data Flow

### Process
1. User logs in through Supabase authentication
2. User ID is available through the session
3. The application retrieves matching data from `profiles`
4. Profile information is shown in the interface

### Result
This creates a personalised user experience while keeping authentication and profile data connected.

---

## Flow 2: Event Creation Flow

### Process
1. Logged-in user opens the create event form
2. User enters event details
3. Frontend sends event data to the `events` table
4. User ID is stored in `created_by`
5. Event becomes visible in the event listing

### Result
This allows events to be created dynamically and linked to the user who submitted them.

---

## Flow 3: Event Attendance Flow

### Process
1. User opens an event
2. User selects **Attend Event**
3. User submits attendance details
4. Application checks the selected event and logged-in user
5. A new record is inserted into `event_attendance`
6. Duplicate registrations are blocked

### Result
This creates a structured record of attendance while keeping event and user data separate and organised.

---

## Flow 4: Daily Check-in Flow

### Process
1. User opens the homepage
2. `dailyCheckin.js` checks the logged-in user
3. Existing check-in data is retrieved from `daily_checkins`
4. System determines whether the user has already checked in today
5. If valid, the streak and total count are updated
6. The UI is updated using saved database values

### Result
This makes the daily check-in feature persistent and more reliable than a frontend-only approach.

---

## Flow 5: FAQ / Chatbot Flow

### Process
1. Frontend loads FAQ data from the `faqs` table
2. User sends a message in the chatbot
3. Message is matched against stored keywords
4. Matching answer is returned to the user

### Result
This allows the chatbot to be supported by structured stored data rather than fixed responses.

---

## Why These Relationships Matter

These relationships matter because they show that the database is not just a set of disconnected tables. It is the foundation for how the system behaves.

The current structure helps the application by:

- linking users to actions and records
- supporting more dynamic functionality
- keeping data normalised and organised
- preparing the system for future scaling
- improving both security and maintainability

This is especially relevant in a campus-focused platform, where features often depend on identity, repeat usage, and user-linked activity.

---

## Analyst Perspective

From a database analyst perspective, the important point is that the system was not only documented at table level, but also considered in terms of:

- relationships between features
- user-linked data flow
- separation of concerns across tables
- future scalability
- support for secure and structured interaction between frontend logic and backend storage

This shows that the database work is connected to both the technical implementation and the wider purpose of the application.

---

## Summary

The current database structure in SuperBuzz supports key relationships between users, events, attendance, FAQs, and engagement tracking. These relationships allow the app to function in a more structured, dynamic, and scalable way.

The data flow across the application shows that the database is an active part of the platform’s implementation, supporting both the visible features of the system and the wider goal of building a practical student-focused campus platform.