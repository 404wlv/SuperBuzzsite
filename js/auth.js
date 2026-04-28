import { supabase } from "./supabaseClient.js";

const allowedDomain = "@wlv.ac.uk";

// email domain validation
export function validateUniversityEmail(email) {
    return email.trim().toLowerCase().endsWith(allowedDomain);
}

// password validation
export function validatePassword(password) {
    // at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
}

// signup
export async function signup(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    if (!validateUniversityEmail(cleanEmail)) {
        alert("Please use a university email address.");
        return false;
    }

    if (!validatePassword(password)) {
        alert("Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        return false;
    }

    const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password
    });

    console.log("Signup response:", data);
    console.log("Signup error:", error);

    if (error) {
        alert(error.message);
        return false;
    }

    alert("Signup successful! Check your email for verification.");
    return true;
}

// login
export async function login(email, password) {
    const cleanEmail = email.trim().toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
    });

    console.log("Login response:", data);
    console.log("Login error:", error);

    if (error) {
        alert(error.message);
        return false;
    }

    return true;
}

// logout
export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
        alert(error.message);
        return false;
    }

    window.location.href = "index.html";
    return true;
}

// forgot password
export async function sendResetEmail(email) {
    const cleanEmail = email.trim().toLowerCase();

    if (!validateUniversityEmail(cleanEmail)) {
        alert("Please use your university email address.");
        return false;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password.html`
    });

    if (error) {
        alert(error.message);
        return false;
    }

    alert("Password reset email sent. Please check your inbox and spam folder.");
    return true;
}

// update password
export async function updatePassword(newPassword) {
    if (!validatePassword(newPassword)) {
        alert("Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        return false;
    }

    const { error } = await supabase.auth.updateUser({
        password: newPassword
    });

    if (error) {
        alert(error.message);
        return false;
    }

    alert("Password updated successfully.");
    return true;
}

// handle state
export async function checkSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.log("Session check error:", error);
        return false;
    }

    return !!data.session;
}