import { supabase } from "./supabaseClient.js"


function getCheckinElements() {
    return {
        card: document.getElementById("checkin-card"),
        progress: document.getElementById("checkin-progress"),
        message: document.getElementById("checkin-message"),
        streakText: document.getElementById("checkin-streak"),
        btn: document.getElementById("checkin-btn")

    }
}

function hideCheckinCard() {
    const { card } = getCheckinElements()
    if (card) {
        card.classList.add("hidden")
    }
}

function updateUI(streak, totalCheckins, checkedToday) {
    const progress = document.getElementById("checkin-progress")
    const message = document.getElementById("checkin-message")
    const streakText = document.getElementById("checkin-streak")
    const btn = document.getElementById("checkin-btn")

    if (!progress || !message || !streakText || !btn) return

    const percent = Math.min((streak / 7) * 100, 100)
    progress.style.width = percent + "%"

    streakText.textContent = `Streak: ${streak} day${streak !== 1 ? "s" : ""}`

    if (checkedToday) {
        btn.textContent = "Checked In ✅"
        btn.classList.remove("bg-fuchsia-800")
        btn.classList.add("bg-green-600")
        btn.disabled = true
    } else {
        btn.textContent = "Check In"
        btn.classList.remove("bg-green-600")
        btn.classList.add("bg-fuchsia-800")
        btn.disabled = false
    }

    message.textContent = `Total check-ins: ${totalCheckins}`
}

async function loadCheckinStatus() {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
        console.log("Error loading user:", userError)
        return
    }

    const user = userData.user
    if (!user) return

    const today = new Date().toISOString().split("T")[0]

    const { data, error } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

    if (error) {
        console.log("Error loading the check-in:", error)
        return
    }

    if (!data) {
        updateUI(0, 0, false)
        return
    }

    const checkedToday = data.last_checkin === today
    updateUI(data.streak ?? 0, data.total_checkins ?? 0, checkedToday)
}

async function handleCheckin() {
    const { data, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log("Session error:", sessionError)
        return
    }

    const user = data.session?.user

    if (!user) {
        alert("User not logged in ❌")
        return
    }

    const today = new Date().toISOString().split("T")[0]

    const { data: existing, error: fetchError } = await supabase
        .from("daily_checkins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle()

    if (fetchError) {
        console.log("Error fetching check-in record:", fetchError)
        return
    }

    if (!existing) {
        const { error: insertError } = await supabase
            .from("daily_checkins")
            .insert({
                user_id: user.id,
                last_checkin: today,
                streak: 1,
                total_checkins: 1,
                reward_claimed: false
            })

        if (insertError) {
            console.log("Error creating first check-in:", insertError)
            return
        }

        updateUI(1, 1, true)
        return
    }

    if (existing.last_checkin === today) {
        updateUI(existing.streak ?? 0, existing.total_checkins ?? 0, true)
        return
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yDate = yesterday.toISOString().split("T")[0]

    let newStreak = 1

    if (existing.last_checkin === yDate) {
        newStreak = (existing.streak ?? 0) + 1
    }

    const newTotalCheckins = (existing.total_checkins ?? 0) + 1

    const { error: updateError } = await supabase
        .from("daily_checkins")
        .update({
            last_checkin: today,
            streak: newStreak,
            total_checkins: newTotalCheckins
        })
        .eq("user_id", user.id)

    if (updateError) {
        console.log("Error updating check-in:", updateError)
        return
    }

    updateUI(newStreak, newTotalCheckins, true)
}

document.addEventListener("DOMContentLoaded", () => {
    loadCheckinStatus()

    const btn = document.getElementById("checkin-btn")
    if (btn) {
        btn.addEventListener("click", handleCheckin)
    }
})