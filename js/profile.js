import { supabase } from "./supabaseClient.js"
import { logout } from "./auth.js"

document.addEventListener("DOMContentLoaded", () => {

  async function loadProfile() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.log("Error loading user:", error)
      return
    }

    const user = data.user

    if (!user) {
      console.log("No user found")
      return
    }

    document.getElementById("profile-email").textContent = user.email
    document.getElementById("profile-id").textContent = user.id

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("display_name, profile_picture")
      .eq("id", user.id)
      .single()

    if (profileError) {
      console.log("Error loading profile table data:", profileError)
    }

    if (profileData?.display_name) {
      document.getElementById("display-name").value = profileData.display_name
    } else if (user.user_metadata?.display_name) {
      document.getElementById("display-name").value =
        user.user_metadata.display_name
    }

    const { count, error: countError } = await supabase
      .from("events")
      .select("*", { count: "exact", head: true })
      .eq("created_by", user.id)

    if (countError) {
      console.log("Error loading created events count:", countError)
    } else {
      const createdCountEl = document.getElementById("events-created-count")
      if (createdCountEl) {
        createdCountEl.textContent = count ?? 0
      }
    }
  }

  loadProfile()

  document.getElementById("save-profile")
    .addEventListener("click", async () => {

      const name = document.getElementById("display-name").value

      const { data, error: userError } = await supabase.auth.getUser()

      if (userError || !data.user) {
        alert("Could not load user")
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

  document.getElementById("logout-btn")
    .addEventListener("click", logout)

  const backBtn = document.getElementById("back-home-btn")
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "home.html"
    })
  }

})