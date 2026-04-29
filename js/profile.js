import { supabase } from "./supabaseClient.js"
import { logout } from "./auth.js"

const TARGET_POINTS = 100

async function protectProfilePage() {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.log("Session check error:", error)
    window.location.href = "index.html"
    return false
  }

  if (!data.session) {
    console.log("No active session, redirecting...")
    window.location.href = "index.html"
    return false
  }

  return true
}

supabase.auth.onAuthStateChange((event, session) => {
  if (!session) {
    window.location.href = "index.html"
  }
})

document.addEventListener("DOMContentLoaded", async () => {
  const allowed = await protectProfilePage()
  if (!allowed) return

  async function loadProfile() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.log("Error loading user:", error)
      window.location.href = "index.html"
      return
    }

    const user = data.user

    if (!user) {
      console.log("No user found")
      window.location.href = "index.html"
      return
    }

    const profileEmailEl = document.getElementById("profile-email")
    const profileIdEl = document.getElementById("profile-id")
    const displayNameInput = document.getElementById("display-name")

    if (profileEmailEl) profileEmailEl.textContent = user.email
    if (profileIdEl) profileIdEl.textContent = user.id

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("display_name, profile_picture")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.log("Error loading profile table data:", profileError)
    }

    if (displayNameInput) {
      if (profileData?.display_name) {
        displayNameInput.value = profileData.display_name
      } else if (user.user_metadata?.display_name) {
        displayNameInput.value = user.user_metadata.display_name
      }
    }

    // events created
    const { count: createdCount, error: createdCountError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("created_by", user.id)

    if (createdCountError) {
      console.log("Error loading created events count:", createdCountError)
    }

    // events attended
    const { count: attendedCount, error: attendedCountError } = await supabase
      .from("event_attendance")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    if (attendedCountError) {
      console.log("Error loading attended events count:", attendedCountError)
    }

    // daily check-in totals
    const { data: checkinData, error: checkinError } = await supabase
      .from("daily_checkins")
      .select("streak, total_checkins, reward_claimed")
      .eq("user_id", user.id)
      .maybeSingle()

    if (checkinError) {
      console.log("Error loading daily check-in data:", checkinError)
    }

    const dcp = checkinData?.total_checkins ?? 0
    const ecp = createdCount ?? 0
    const eap = attendedCount ?? 0

    const totalPoints = dcp + (ecp * 50) + (eap * 20)
    const progressPercent = Math.min((totalPoints * 100) / TARGET_POINTS, 100)
    const coupons = Math.floor(totalPoints / TARGET_POINTS)

    // existing created events field
    const createdCountEl = document.getElementById("events-created-count")
    if (createdCountEl) {
      createdCountEl.textContent = ecp
    }

    // optional extra profile fields/cards if they exist in HTML
    const pointsEl = document.getElementById("points-count")
    if (pointsEl) {
      pointsEl.textContent = totalPoints
    }

    const couponsEl = document.getElementById("coupons-count")
    if (couponsEl) {
      couponsEl.textContent = coupons
    }

    const attendedEl = document.getElementById("attended-count")
    if (attendedEl) {
      attendedEl.textContent = eap
    }

    const appliedEl = document.getElementById("applied-count")
    if (appliedEl) {
      appliedEl.textContent = dcp
    }

    const streakEl = document.getElementById("streak-count")
    if (streakEl) {
      streakEl.textContent = checkinData?.streak ?? 0
    }

    const totalCheckinsEl = document.getElementById("total-checkins-count")
    if (totalCheckinsEl) {
      totalCheckinsEl.textContent = dcp
    }

    const progressBarEl = document.getElementById("reward-progress")
    if (progressBarEl) {
      progressBarEl.style.width = `${progressPercent}%`
    }

    const progressTextEl = document.getElementById("reward-progress-text")
    if (progressTextEl) {
      progressTextEl.textContent = `${Math.round(progressPercent)}%`
    }

    const rewardStatusEl = document.getElementById("reward-status")
    if (rewardStatusEl) {
      if (totalPoints >= TARGET_POINTS) {
        rewardStatusEl.textContent = "Reward unlocked 🎉"
      } else {
        rewardStatusEl.textContent = `${TARGET_POINTS - totalPoints} more point(s) to unlock a reward`
      }
    }

    console.log("Reward breakdown:", {
      dcp,
      ecp,
      eap,
      totalPoints,
      progressPercent,
      coupons
    })
  }

  await loadProfile()

  const saveProfileBtn = document.getElementById("save-profile")
  if (saveProfileBtn) {
    saveProfileBtn.addEventListener("click", async () => {
      const name = document.getElementById("display-name")?.value ?? ""

      const { data, error: userError } = await supabase.auth.getUser()

      if (userError || !data.user) {
        alert("Could not load user")
        window.location.href = "index.html"
        return
      }

      const user = data.user

      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: name
        }
      })

      if (error) {
        alert(error.message)
        return
      }

      const { error: profileUpdateError } = await supabase
        .from("profiles")
        .update({
          display_name: name
        })
        .eq("id", user.id)

      if (profileUpdateError) {
        console.log("Error updating profiles table:", profileUpdateError)
      }

      alert("Profile updated successfully")
    })
  }

  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout)
  }

  const backBtn = document.getElementById("back-home-btn")
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "home.html"
    })
  }
})