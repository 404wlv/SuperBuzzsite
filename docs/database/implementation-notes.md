# Database Implementation Notes

## Purpose

This document explains how the database has been implemented across the SuperBuzz platform and how it connects directly to visible functionality in the application.

The aim is to show that the database is not only documented in schema notes and table descriptions, but is also actively used within the frontend logic to support real features. This is important because the value of the database in this project is not only in storage, but in how it improves usability, consistency, and overall system structure.

---

## Overview

The current implementation uses **Supabase** as the backend database and authentication layer. The frontend uses JavaScript modules to interact with Supabase tables and retrieve or update data in response to user actions.

This means several parts of the application are data-driven rather than static. Instead of only displaying fixed information, the platform reads from and writes to the database in ways that support a more interactive and personalised student experience.

The database is currently implemented across the following main feature areas:

- profile information
- event creation and display
- event attendance
- FAQ-based chatbot support
- daily check-in and engagement tracking
- profile reward and activity summary

---

## 1. Profile Implementation

### Related table

- `profiles`

### Related logic

- `profile.js`

### Implementation summary

The profile feature uses authenticated user data together with the `profiles` table to display and update user-linked information. This includes values such as display name, email-linked profile data, and activity-related summary information shown on the profile page.

The implementation works by:

1. checking the active session
2. retrieving the current authenticated user
3. using the user ID to fetch matching profile data
4. displaying that information on the profile page
5. allowing the display name to be updated and written back to the database

### Why this matters

This improves the student experience by making the application feel personalised rather than generic. It also demonstrates that the platform is capable of managing user-linked data in a structured way.

---

## 2. Event Display and Retrieval

### Related table

- `events`

### Related logic

- `home.js`

### Implementation summary

Events are loaded dynamically from the `events` table and displayed on the homepage. Rather than hardcoding event cards directly into the interface, the frontend retrieves event records from Supabase and renders them into the page.

The implementation works by:

1. querying the `events` table
2. ordering events by `event_date`
3. mapping event records into JavaScript objects
4. rendering cards into the event grid
5. opening a modal with more detail when an event is selected

The event modal displays:

- title
- category
- description
- location
- date and time

### Why this matters

This improves student experience because event information can be managed and updated more easily, while students see content that is structured and current. It also makes the application feel more realistic, since event listings are coming from stored backend records rather than temporary static content.

---

## 3. Event Creation

### Related table

- `events`

### Related logic

- `home.js`

### Implementation summary

The event creation flow allows a logged-in user to submit a new event through a modal form. When the form is completed, the application inserts a new record into the `events` table and links it to the current authenticated user through the `created_by` field.

The implementation works by:

1. checking the user is logged in
2. validating the form inputs
3. collecting title, category, description, location, and event date
4. inserting the event into Supabase
5. storing the creator’s user ID in `created_by`
6. refreshing the event list after successful insertion

### Why this matters

This improves the student experience by making the platform more interactive and community-driven. Instead of only consuming information, users can contribute content.

---

## 4. Event Attendance Registration

### Related table

- `event_attendance`

### Related logic

- `home.js`

### Implementation summary

The event attendance flow allows a logged-in user to register for an event through a form. The system then inserts a record into the `event_attendance` table linking the selected event and the authenticated user.

The implementation works by:

1. opening the selected event modal
2. allowing the user to choose to attend the event
3. validating the attendance form inputs
4. checking the user is logged in
5. inserting an attendance record into `event_attendance`
6. blocking duplicate registrations where applicable

The table structure supports clean separation between:

- event data
- user data
- attendance records

### Why this matters

This improves student experience by turning the event feature into something interactive and useful. It also creates the basis for future analytics, attendance tracking, and engagement measurement.

---

## 5. Daily Check-in and Engagement Tracking

### Related table

- `daily_checkins`

### Related logic

- `dailyCheckin.js`
- profile summary logic in `profile.js`

### Implementation summary

The daily check-in feature tracks student engagement over time. It stores the user’s last check-in date, current streak, total number of check-ins, and reward-related progress state.

The implementation works by:

1. retrieving the logged-in user
2. checking whether the user already has a `daily_checkins` record
3. comparing today’s date with the stored `last_checkin`
4. deciding whether to:
   - create a new record
   - increment the streak
   - reset the streak
   - block duplicate same-day check-ins
5. updating the UI using saved database values

An important part of this implementation is that the check-in state is controlled from saved Supabase data rather than only from temporary frontend behaviour. This makes the feature more reliable and persistent.

### Why this matters

This improves student experience by rewarding regular engagement and making the platform feel more interactive. It also gives the app a feature that supports repeat usage rather than one-time visits.

---

## 6. FAQ and Chatbot Support

### Related table

- `faqs`

### Related logic

- `home.js`

### Implementation summary

The chatbot uses data from the `faqs` table rather than relying only on fixed hardcoded responses. FAQ records are loaded from Supabase and matched against user input using stored keywords.

The implementation works by:

1. querying the `faqs` table
2. storing answers and keywords in the frontend
3. comparing user chat input against those keywords
4. returning the most relevant answer

### Why this matters

This improves student experience by giving the platform a simple support feature that can answer common questions without needing direct manual intervention.

---

## 7. Profile Reward Summary and Cross-Feature Use of Data

### Related tables

- `profiles`
- `events`
- `event_attendance`
- `daily_checkins`

### Related logic

- `profile.js`

### Implementation summary

The profile view is not limited to basic user data. It also combines information from several database-backed features to give the user a summary of their activity.

This includes values such as:

- events created
- events attended
- total points
- coupon or reward progress
- check-in-related values

This is important because it shows that the database is not only being used in isolated features. Multiple tables contribute to a wider user view.

### Why this matters

This improves student experience by making the platform feel joined-up and personalised. Instead of separate disconnected features, users see their overall engagement reflected back to them.

---

## 8. Security and Access Considerations in Implementation

The database implementation is closely linked to authenticated user sessions. This means the logic does not simply read and write records without checks, but instead uses the logged-in state before allowing key actions.

Examples include:

- checking session state before opening protected pages
- linking event creation to the authenticated user
- linking attendance to the authenticated user
- linking check-in data to the authenticated user
- linking profile data to the correct authenticated account

This supports more secure and sensible interaction with the database and helps keep user-linked records tied to the right person.

---

## 9. Login Security with reCAPTCHA

## Related logic

- `logon.html`
- `logon.js`

### Implementation summary

To improve security during authentication, Google reCAPTCHA has been integrated into the login flow. This ensures that only verified human users can access the login functionality.

The implementation works by:

1. loading the reCAPTCHA widget on the login page
2. requiring the user to complete the verification challenge
3. storing the verification response token
4. blocking the login process if verification is not completed
5. allowing login only after successful human verification

This adds an additional validation layer before authentication requests are sent to Supabase.

### Why this matters

This improves system security by reducing the risk of:

- automated bot login attempts
- brute force attacks
- spam account access attempts

It ensures that backend authentication is not exposed directly to unverified traffic, making the platform more robust and secure.

### Future improvements

The current implementation focuses on client-side verification. This can be extended further by:

- validating the reCAPTCHA token on a secure backend server
- using reCAPTCHA v3 for invisible risk-based scoring
- combining reCAPTCHA with rate limiting or login attempt tracking
- adding multi-factor authentication (MFA) for higher security levels

These improvements would strengthen protection against more advanced automated or malicious activity.

---

## Summary

The database has been implemented across key parts of SuperBuzz, including profiles, events, attendance, FAQs, and daily check-ins. These implementations support both the technical structure of the platform and the experience of students interacting with it.

Overall, the database is not just present in diagrams or documentation. It is actively used in the system and helps make the platform more interactive, consistent, and realistic as a student-focused product.
