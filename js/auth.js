import { supabase } from "./supabaseClient";

const allowedDomain = "@wlv.ac.uk";


//////email domain validation

function validateUniversityEmail(email) {
    return email.endsWith(allowedDomain);
}

///password validation
function validatePassword(password) {
    return password.length >= 8
}




////////////signup
export async function signup(email, password) {
    if (!validateUniversityEmail(email)) {
        alert("Please use a university email address.");
        return
    }
    if (!validatePassword(password)) {
        alert("Password must be atleast 8 characters long.")
        return
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    if (error) {
        alert(error.message)
    } else {
        alert("Signup successful! Check your email for verification/")
    }
}


///login
export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) {
        alert(error.message)
    } else {
        showMainApp()
    }
}


//////////logout/////////////////
export async function logout() {
    await supabase.auth.signOut()
    location.reload()
}

///forget passord///
export async function sendResetEmail(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
    })
    if (error) {
        alert(error.message)
    } else {
        alert("Password reset email sent.")
    }
}


///update password
export async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })
    if (error) {
        alert(error.message)
    } else {
        alert("Password updated successfully.")
    }
}


//////handle state
export async function checkSession() {
    const { data } = await supabase.auth.getSession()

    if (data.session) {
        showMainApp()
    }
}


function showMainApp() {
    document.getElementById("login-modal").classList.add("hidden")
    document.getElementById("signup-modal").classList.add("hidden")
    document.getElementById("forgot-modal").classList.add("hidden")
    document.getElementById("reset-modal").classList.add("hidden")
    document.getElementById("main-app").classList.remove("hidden")

}
