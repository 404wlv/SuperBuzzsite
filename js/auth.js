import { supabase } from "./supabaseClient.js";

const allowedDomain = "@wlv.ac.uk";


//////email domain validation

export function validateUniversityEmail(email) {
    return email.endsWith(allowedDomain);
}

///password validation
export function validatePassword(password) {
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
        alert("Password must be atleast 8 characters long, with atleast 1 uppercase, 1 lowercase, 1 number, 1 special character.")
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
        return false;
    } else {
        alert("Signup successful! Check your email for verification/")
        return true;
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
        return false;
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
        return false;
    } else {
        alert("Password reset email sent.")
        return true;
    }
}


///update password
export async function updatePassword(newPassword) {
    const { error } = await supabase.auth.updateUser({
        password: newPassword
    })
    if (error) {
        alert(error.message)
        return false;
    } else {
        alert("Password updated successfully.")
        return true;
    }
}


//////handle state
export async function checkSession() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
}



