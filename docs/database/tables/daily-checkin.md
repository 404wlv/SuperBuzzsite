# Daily Check-in System

## Purpose

The **daily_checkins** feature is designed to increase student engagement within the platform by encouraging consistent daily interaction.

Users can check in once per day to build a streak. After reaching a defined milestone (e.g., 3 consecutive days), they unlock rewards such as discounts or free items.

---

## Database Design

### Table: `daily_checkins`

| Column Name  | Data Type | Description                                        |
| ------------ | --------- | -------------------------------------------------- |
| user_id      | uuid      | Unique identifier linked to authenticated user     |
| last_checkin | date      | Stores the last date the user checked in           |
| streak       | integer   | Number of consecutive days the user has checked in |

### Key Notes

- Each user has **one record only**
- `user_id` is linked to Supabase authentication
- Streak resets if a day is missed

---

## How It Works (Workflow)

1. User logs into the platform
2. User clicks **"Check In"** button
3. System verifies:
   - If user is logged in
   - If user already checked in today

4. If valid:
   - Update streak
   - Save today's date

5. UI updates:
   - Progress bar increases
   - Message updates

6. If streak reaches target:
   - Reward is unlocked 🎉

---

## Logic Summary

- If no previous record → create new entry (streak = 1)
- If last check-in was **yesterday** → increment streak
- If last check-in was **not yesterday** → reset streak to 1
- If already checked in today → block duplicate action

---

## Architecture Diagram

```
User (Browser)
     │
     ▼
Frontend (home.html + dailyCheckin.js)
     │
     │ User clicks "Check In"
     ▼
Supabase Auth
     │
     │ Verify logged-in user
     ▼
Supabase Database (daily_checkins)
     │
     │ Fetch / Update streak data
     ▼
Frontend UI Update
     │
     ▼
User sees updated progress & reward
```

---

## Reward System

- Example target: **3-day streak**
- On completion:
  - User receives reward message
  - Example:

    ```
    🎉 Congrats! Use code BROWNIE123 for a free brownie!
    ```

- Future rewards:
  - 7 days → free coffee
  - 14 days → meal discount
  - 30 days → premium reward

---

## Future Improvement: Location-Based Check-in

To prevent misuse, location validation can be added.

### Concept Flow

```
User clicks Check In
        │
        ▼
Browser Geolocation API
        │
        ▼
Check if user is inside campus radius
        │
   ┌────┴────┐
   ▼         ▼
Allowed     Blocked
  ✅          ❌
```

### Implementation Idea

- Use `navigator.geolocation` in frontend
- Define campus coordinates (latitude & longitude)
- Allow check-in only within defined radius (e.g., 500 meters)

---

## Security Considerations

- Row Level Security (RLS) ensures:
  - Users can only access their own data

- Policies required:
  - SELECT (read own data)
  - INSERT (create own record)
  - UPDATE (update own record)

---

## Future Enhancements

- Leaderboard (top active students)
- Streak freeze (skip one missed day)
- Notifications/reminders
- Reward redemption tracking
- Admin dashboard for analytics

---

## Summary

The Daily Check-in system is a lightweight engagement feature that:

- Encourages daily platform usage
- Tracks user consistency
- Rewards active users
- Scales easily with additional features

It integrates seamlessly with Supabase authentication and database services, making it efficient, secure, and extensible for future development.

---
