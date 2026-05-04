# Database Overview

## Purpose

The database layer is one of the core parts of the SuperBuzz platform. It supports the storage, retrieval, and updating of key user and system data needed for the application to function properly.

In this project, the database is not just used for storage in the background. It directly supports several visible features in the app, including user profiles, event creation, event attendance, FAQ-based chatbot responses, and the daily check-in system.

This makes the database an important part of both the technical implementation and the overall user experience of the platform.

---

## Platform Context

SuperBuzz is designed as a student-focused campus platform. Its purpose is to improve access to useful campus-related features and increase student engagement through practical tools and interactive functions.

The database supports this goal by making it possible to:

- store and manage user-linked information
- create and display events dynamically
- track attendance for events
- store FAQ responses for chatbot support
- track student check-ins and engagement streaks
- connect features to authenticated users securely

This means the database helps move the app from being a static interface to a more personalised and interactive platform.

---

## Technology Choice

The project uses **Supabase** as the backend database platform.

Supabase was a suitable choice because it provides:

- a hosted PostgreSQL database
- built-in user authentication
- support for secure user-linked data
- an API-friendly structure that works well with JavaScript frontend files
- scalability for future features

This made it possible to integrate the frontend with real database tables rather than relying only on hardcoded or temporary data.

---

## Main Tables in the System

The current database structure includes the following main tables:

### `profiles`
Stores user-related profile information linked to authentication.

Used for:
- display name
- email-linked profile data
- profile-related statistics and personalisation

### `events`
Stores event records created or displayed in the app.

Used for:
- event title
- category
- description
- location
- event date
- event ownership through `created_by`

### `event_attendance`
Stores links between users and events they choose to attend.

Used for:
- attendance registration
- preventing duplicate attendance entries
- future attendance reporting and analytics

### `daily_checkins`
Stores each user’s daily engagement data.

Used for:
- last check-in date
- current streak
- total check-ins
- future reward logic

### `faqs`
Stores answers and keywords used by the chatbot feature.

Used for:
- FAQ retrieval
- keyword matching
- chatbot support responses

---

## How the Database Supports the Application

The database is used across several major areas of the platform.

### 1. User-linked functionality
The system uses authenticated users as the basis for personalised features. This allows actions such as event creation, attendance registration, and profile updates to be linked to a specific logged-in user.

### 2. Dynamic event functionality
Events are stored in the database and retrieved into the application interface. This allows the event section to be data-driven rather than hardcoded, which is more realistic and scalable.

### 3. Attendance tracking
The event attendance feature uses a separate linking table so users and events can be connected in a structured way. This supports better database design and prepares the platform for attendance-based reporting in future versions.

### 4. Daily engagement tracking
The daily check-in system uses database records to store streaks and total check-ins. This allows the application to remember a user’s progress properly, even after refreshing or reopening the page.

### 5. Chatbot support
The FAQ feature uses stored questions and answers from the database to support simple chatbot responses. This gives the application a basic support mechanism backed by structured data.

---

## Why the Current Database Design Matters

The current database design matters because it supports the transition from a basic prototype to a more complete and structured product.

It helps by:

- keeping data organised across separate tables
- linking users to actions and features
- making the application more dynamic
- reducing reliance on temporary frontend-only logic
- supporting future extension without needing to redesign everything

This is especially important in a campus platform, where many features depend on user identity, stored records, and repeated interactions over time.

---

## Security and Data Considerations

Because the platform uses user-linked data, security and access control are important.

Relevant considerations include:

- authenticated users should only access or update their own personal data
- event attendance should prevent duplicate registrations
- check-in records should not be editable by other users
- profile-linked data should stay connected to the correct authenticated account

Supabase supports this through authentication and Row Level Security (RLS), which is important for protecting user-specific records.

---

## Evidence of Database Use in the Project

The database is visible not only in schema documentation but also in actual application logic.

Examples include:

- `home.js` loading events from the `events` table
- `home.js` inserting new events into the `events` table
- `home.js` inserting attendance into `event_attendance`
- `dailyCheckin.js` reading and updating `daily_checkins`
- `profile.js` reading profile and user-linked summary data
- chatbot logic reading data from `faqs`

This shows that the database is actively implemented through our code, especially while working closely with the software team. In this sense, the database role acts as a bridge between the backend structure and the frontend behaviour. This has also meant reviewing code and, at times, touching related HTML so that it aligns properly with the stored data, table structure, and linked user interactions.

This is important from both a security and a user experience perspective, because the database is not only storing and tracking information, but also helping ensure that features behave safely, consistently, and meaningfully across the application. Rather than existing only as a diagram or design idea, the database is part of building a platform that is tangible, functional, and genuinely useful for students.

---

## Future Direction

The current design is strong enough to support further development. Possible future additions include:

- reward redemption tracking
- event moderation and approval
- attendance analytics
- richer profile customisation
- leaderboard features
- location-based check-in validation
- stronger reporting for student engagement
- API linkage

Because the current database already separates core concerns into different tables, these improvements could be added without having to rebuild the entire structure. This gives the team room to keep developing and refining the platform as new ideas are explored, reviewed, and agreed across the group.

---

## Summary

Overall, the database layer underpins the core personalised features of the SuperBuzz platform. It supports the storage and management of profiles, events, attendance, FAQ data, and daily engagement records.

This makes the database a central part of both the technical system and the wider functionality of the platform, supporting its overall goal of improving student engagement in a campus-focused environment.