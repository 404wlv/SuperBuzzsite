# Daily Check-in System Flow Diagram

## Purpose

This diagram shows how the daily check-in feature works across the SuperBuzz platform, linking the frontend, authentication layer, database table, and user interface updates.

It reflects the implemented logic where the check-in state is stored in Supabase and then used to decide how the interface should appear, including after page refresh.

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
| - dailyCheckin.js             |
+---------------+---------------+
                |
                | User clicks "Check In"
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
|     Table: daily_checkins     |
|                               |
| Fields used:                  |
| - id                          |
| - user_id                     |
| - last_checkin                |
| - streak                      |
| - total_checkins              |
| - reward_claimed              |
+---------------+---------------+
                |
                | read / insert / update
                v
+-------------------------------+
| Frontend UI Update            |
| - progress bar updates        |
| - streak text updates         |
| - total check-ins updates     |
| - button state changes        |
| - card visibility controlled  |
+---------------+---------------+
                |
                v
+-------------------------------+
| User Feedback                 |
| - "Checked In ✅"             |
| - duplicate blocked           |
| - reward-ready progress shown |
+-------------------------------+
