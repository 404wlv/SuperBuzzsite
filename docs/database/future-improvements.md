# Future Improvements

## Purpose

This document outlines realistic future improvements for the SuperBuzz database and wider data layer. These ideas build on the current implementation and show how the platform could be extended in a structured and scalable way.

The aim is not to introduce unrelated features, but to identify sensible next steps based on the system that already exists. This is useful from a database analyst perspective because it shows how the current design can support future development without major redesign.

---

## 1. Reward Redemption Tracking

### Current position
The daily check-in feature already stores:
- `last_checkin`
- `streak`
- `reward_claimed`
- `total_checkins`

### Improvement
A dedicated reward or redemption table could be added later to track:
- what reward was unlocked
- when it was redeemed
- whether it is still active
- which user claimed it

### Why this matters
This would make the reward system more complete and easier to manage, rather than only showing progress in the interface.

---

## 2. Event Moderation and Status Handling

### Current position
The `events` table already supports user-created events and includes `created_by`.

### Improvement
Additional fields could be added later, such as:
- `approved`
- `status`
- `reviewed_by`

This would allow events to go through moderation before appearing publicly if needed.

### Why this matters
This would improve data quality, reduce misuse, and give more control if the platform grows.

---

## 3. Stronger Attendance Tracking

### Current position
The `event_attendance` table stores which user is linked to which event.

### Improvement
Attendance could be expanded to include:
- attendance status (`registered`, `attended`, `cancelled`)
- timestamp of attendance confirmation
- optional post-event feedback support

### Why this matters
This would make attendance data more useful for reporting and engagement analysis.

---

## 4. Better Account and Access Modelling

### Current position
The app currently links data to authenticated users through Supabase auth.

### Improvement
The platform could later improve how users are classified or validated, for example by:
- supporting different user types or roles
- improving how student identity is represented in the data model
- reviewing whether domain-restricted email sign-up is the best long-term approach
- supporting a more flexible access model before any formal university-linked authentication is introduced

### Why this matters
This is important because access design affects usability, testing, scalability, and long-term product direction. A more thoughtful account model would make the system easier to manage and more realistic as the platform evolves.

---

## 5. Richer Profile Data

### Current position
The `profiles` table already supports display name and profile-linked data.

### Improvement
The profile feature could later include:
- course or department
- student interests
- campus preferences
- saved or favourite events
- stronger profile customisation

### Why this matters
This would improve personalisation and allow the platform to feel more tailored to each student.

---

## 6. Reporting and Analytics

### Current position
The current system already stores useful engagement and event-related data.

### Improvement
Admin or analyst-focused reporting could later include:
- total events created
- total event attendance
- most active users
- check-in frequency
- engagement by event category
- FAQ usage trends

### Why this matters
This would help evaluate whether the platform is meeting its engagement goals and would support more informed decision-making.

---

## 7. Stronger Validation and Constraints

### Current position
The system already uses linked user data and duplicate attendance checks in the application logic.

### Improvement
Future database work could strengthen this further through:
- more explicit uniqueness constraints
- additional foreign key relationships where appropriate
- stricter validation for key fields
- better prevention of duplicate or inconsistent records

### Why this matters
This would improve data quality and make the system more reliable as usage grows.

---

## 8. Security and Policy Refinement

### Current position
The system already depends on authenticated users and user-linked records.

### Improvement
Future work could include:
- more detailed Row Level Security policies
- clearer separation of user and admin permissions
- tighter control over who can read or update sensitive records
- audit-friendly handling of important actions

### Why this matters
As the app grows, stronger security and access control become increasingly important.

---

## 9. Better Search and Filtering Support

### Current position
Events are already stored in a structured way and can be displayed dynamically.

### Improvement
The system could later support:
- richer event tags
- indexed search fields
- category filters
- date range filtering
- saved search preferences

### Why this matters
As the amount of event data grows, users will need more precise ways to find relevant information.

---

## 10. Future Data Integration Possibilities

### Current position
The app is currently centred around Supabase-stored platform data.

### Improvement
In future, the platform could consider integrating additional external or institutional data sources where useful and agreed by the team, but only where they support the core student experience and align with the product direction.

This could include selected API for example bus or linked service integrations later, but would need to be planned carefully alongside the existing database structure, depending on the situation.

### Why this matters
This keeps the current database design open to future extension without claiming features that are not yet implemented.

---

## 11. Product Direction and MMP Value

The current implementation already demonstrates several useful student-focused features. The next improvements do not need to reinvent the system, but rather strengthen what already works.

These future improvements help position SuperBuzz closer to a stronger minimum marketable product because they build on the current foundations of:

- identity-linked features
- event interaction
- engagement tracking
- support functionality
- structured user-linked data

This means the platform has room to grow in a way that is both technically realistic and commercially meaningful.

---

## Summary

The current database and data-layer design already provide a solid foundation for SuperBuzz. Future improvements such as reward tracking, moderation, analytics, richer personalisation, stronger constraints, and better account modelling could extend the system without requiring a full redesign.

This shows that the current platform is not only functional in its present form, but also well positioned for future development as a stronger and more useful student-focused MMP.