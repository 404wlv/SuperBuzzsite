import { supabase } from "./supabaseClient.js";

const TARGET_STREAK = 3;

function updateUI(streak, checkedToday) {
    const progress = document.getElementById("checkin-progress");
    const message = document.getElementById("checkin-message");
    const streakText = document.getElementById("checkin-streak");
    const btn = document.getElementById("checkin-btn");

    if (!progress || !message || !streakText || !btn) return;

    const percent = Math.min((streak / TARGET_STREAK) * 100, 100);
    progress.style.width = percent + "%";

    streakText.textContent = `Streak: ${streak} day${streak !== 1 ? "s" : ""}`;

    if (checkedToday) {
        btn.textContent = "Checked In ✅";
        btn.classList.remove("bg-fuchsia-800");
        btn.classList.add("bg-green-600");
        btn.disabled = true;
    } else {
        btn.textContent = "Check In";
        btn.disabled = false;
    }
}