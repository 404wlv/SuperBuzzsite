console.log("Daily Checkin JS Loaded")
import { supabase } from "./supabaseClient.js"

const TARGET_STREAK = 3

function updateUI(streak, checkedToday) {
    const progress = document.getElementById("checkin-progress")
    const message = document.getElementById("checkin-message")
    const streakText = document.getElementById("checkin-streak")
    const btn = document.getElementById("checkin-btn")

    if (!progress || !message || !streakText || !btn) return

    const percent = Math.min((streak / TARGET_STREAK) * 100, 100)
    progress.style.width = percent + "%"

    streakText.textContent = `Streak: ${streak} day${streak !== 1 ? "s" : ""}`

    if (checkedToday) {
        btn.textContent = "Checked In ✅"
        btn.classList.remove("bg-fuchsia-800")
        btn.classList.add("bg-green-600")
        btn.disabled = false
    } else {
        btn.textContent = "Check In"
        btn.disabled = false
    }

    if (streak >= TARGET_STREAK) {
        message.textContent = "🎉 Reward unlocked! Claim your free brownie!"
    } else {
        message.textContent = `${TARGET_STREAK - streak} more day(s) to earn a reward 🍫`
    }
}

async function loadCheckinStatus() {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()
    if (error) {
        console.log("Errror loading the checkin:", error)
        return
    }

    if (!data) {
        updateUI(0, false)
        return
    }

    const checkedToday = data.last_checkin === today
    updateUI(data.streak, checkedToday)
}

async function handleCheckin() {
    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user
    if (!user) return

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()
    if (error) {
        console.log("error fetching checkin:", error)
        return
    }

    if (!data) {
        await supabase.from("daily_checkins").insert({
            user_id: user.id,
            last_checkin: today,
            streak: 1
        })

        updateUI(1, true)
        return
    }

    if (data.last_checkin === today) {
        updateUI(data.streak, true)
        return
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yDate = yesterday.toISOString().split("T")[0]

    let newStreak = 1

    if (data.last_checkin === yDate) {
        newStreak = data.streak + 1
    }

    await supabase
        .from("daily_checkins")
        .update({
            last_checkin: today,
            streak: newStreak
        })
        .eq("user_id", user.id)

    if (newStreak === TARGET_STREAK) {
        alert("🎉 Congrats! Use code BROWNIE123 for a free brownie!")
    }

    updateUI(newStreak, true)
}

document.addEventListener("DOMContentLoaded", () => {
    loadCheckinStatus()

    const btn = document.getElementById("checkin-btn")
    if (btn) {
        btn.addEventListener("click", handleCheckin)
    }

})
