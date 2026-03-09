import { supabase } from "./supabaseClient.js";

const allowedDomain = "@wlv.ac.uk";


//////email domain validation

function validateUniversityEmail(email) {
    return email.endsWith(allowedDomain);
}

///password validation
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
}




////////////signup
export async function signup(email, password) {
    if (!validateUniversityEmail(email)) {
        alert("Please use a university email address.");
        return false;
    }
    if (!validatePassword(password)) {
        alert("Password must be atleast 8 characters long.")
        return false;
    }
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    console.log("Signup response:", data)
    console.log("Signup error:", error)
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
        return true;
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
    const { data } = await supabase.auth.getSession();
    return !!data.session;
}



