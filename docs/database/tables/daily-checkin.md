# Daily Check-in System

## Purpose
The `daily_checkins` feature is designed to increase student engagement within the platform by encouraging consistent daily interaction.

Users can check in once per day to build a streak. As they continue checking in, their activity is stored and reflected in the interface through a progress bar, streak count, and total number of check-ins. This also supports the wider reward system in the platform.

---

## Database Design

### Table: `daily_checkins`

| Column Name     | Data Type | Description |
|----------------|-----------|-------------|
| id             | uuid      | Unique identifier for each daily check-in record |
| user_id        | uuid      | Unique identifier linked to the authenticated user |
| last_checkin   | date      | Stores the last date the user checked in |
| streak         | int2      | Number of consecutive days the user has checked in |
| reward_claimed | bool      | Indicates whether the user has already claimed a reward |
| total_checkins | int4      | Stores the total number of times the user has checked in |

### Key Notes
- Each user should only have one main check-in record
- `user_id` is linked to Supabase authentication
- `streak` resets if a day is missed
- `total_checkins` continues increasing even if the streak resets
- `reward_claimed` can be used later for reward tracking

---

## How It Works (Workflow)

1. User logs into the platform  
2. User clicks the **Check In** button  
3. System verifies:
   - the user is logged in
   - whether the user has already checked in today
4. If valid:
   - the system updates the streak
   - stores today’s date as `last_checkin`
   - increases `total_checkins`
5. The interface updates:
   - progress bar changes
   - streak value updates
   - total check-ins message updates
6. If the user has already checked in today:
   - duplicate check-in is blocked
   - the button is disabled
   - the check-in card can be hidden from the page

---

## Logic Summary

- If no previous record exists → create a new record with:
  - `streak = 1`
  - `total_checkins = 1`
- If `last_checkin` was yesterday → increment streak
- If `last_checkin` was not yesterday → reset streak to 1
- If already checked in today → block duplicate action
- `total_checkins` always increases with each successful daily check-in

---

## Architecture Flow

User (Browser)  
↓  
Frontend (`home.html` + `dailyCheckin.js`)  
↓  
User clicks **Check In**  
↓  
Supabase Auth verifies logged-in user  
↓  
Supabase Database (`daily_checkins`) fetches or updates record  
↓  
Frontend updates streak, progress bar, and button state  
↓  
User sees updated check-in status

---

## Reward System

Example target: **3-day streak**

On completion:
- user receives a reward message
- future versions can connect this to discounts, free items, or loyalty rewards

### Example
`🎉 Congrats! Use code BROWNIE123 for a free brownie!`

### Possible future rewards
- 7 days → free coffee
- 14 days → meal discount
- 30 days → premium reward

---

## Security Considerations

Row Level Security (RLS) should ensure that:

- users can only access their own check-in data
- users can only insert their own record
- users can only update their own record

Suggested policies:
- `SELECT` → read own data
- `INSERT` → create own record
- `UPDATE` → update own record

---

## Future Improvements

- leaderboard for most active students
- streak freeze for one missed day
- reward redemption history
- notifications and reminders
- analytics dashboard for admins
- location-based validation to confirm the student is on or near campus

---

## Summary

The Daily Check-in system is a lightweight engagement feature that:

- encourages daily platform use
- tracks user consistency
- stores both streak and total usage
- supports future rewards and analytics

It integrates with Supabase authentication and the `daily_checkins` table, making it secure, scalable, and suitable for future extension.