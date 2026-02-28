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