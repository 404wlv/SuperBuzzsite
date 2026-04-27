## 🧩 System Architecture (Detailed)

```
+---------------------+
|     User Device     |
| (Mobile / Desktop)  |
+----------+----------+
           |
           ▼
+------------------------------+
| Frontend (HTML + JS Modules) |
| - home.html                  |
| - dailyCheckin.js            |
+--------------+---------------+
               |
               ▼
+------------------------------+
|     Supabase Auth Service    |
|  - Validates user session    |
+--------------+---------------+
               |
               ▼
+------------------------------+
|   Supabase Database          |
|   Table: daily_checkins      |
|                              |
| Fields:                      |
| - user_id                    |
| - last_checkin               |
| - streak                     |
+--------------+---------------+
               |
               ▼
+------------------------------+
| Frontend UI Renderer         |
| - Progress bar update        |
| - Streak display             |
| - Reward logic               |
+--------------+---------------+
               |
               ▼
+------------------------------+
| User Interface Feedback      |
| - "Checked In ✅"            |
| - Reward unlocked 🎉         |
+------------------------------+
```

---
