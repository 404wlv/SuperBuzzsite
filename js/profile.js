import { supabase } from "./supabaseClient.js"
import { logout } from "./auth.js"


async function loadProfile() {

    const { data, error } = await supabase.auth.getUser()

    if (error) {
        console.log("Error loading user:", error)
        return
    }

    const user = data.user

    document.getElementById("profile-email").textContent = user.email
    document.getElementById("profile-id").textContent = user.id

    if (user.user_metadata?.display_name) {
        document.getElementById("display-name").value =
            user.user_metadata.display_name
    }

}

loadProfile()

document.getElementById("save-profile")
    .addEventListener("click", async () => {

        const name = document.getElementById("display-name").value

        const { error } = await supabase.auth.updateUser({

            data: {
                display_name: name
            }

        })

        if (error) {
            alert(error.message)
        }
        else {
            alert("Profile updated successfully")
        }

    })
document.getElementById("logout-btn")
    .addEventListener("click", logout)





const backBtn = document.getElementById("back-home-btn")
if (backBtn) {
    backBtn.addEventListener("click", () => {
        window.location.href = "home.html"
    })
}