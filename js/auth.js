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


//stuff from main.js that should be here
document.addEventListener("DOMContentLoaded", () => {
    // Login
    const loginBtn = document.getElementById("login-submit");

    loginBtn.addEventListener("click", () => {

        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        if (!validateUniversityEmail(email)) {
            alert("Use university email!");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters, include uppercase + lowercase letters and numbers");
            return;
        }

        // SUCCESS → Show Main App
        hide("login-modal");
        show("main-app");
    });


    // login side buttons
    const signupBtn = document.getElementById("login-to-signup");
    signupBtn
        .addEventListener("click", () => {
            hide("login-modal");
            show("signup-modal");
        });

    const forgotPasswordBtn = document.getElementById("forgot-password-btn");
    forgotPasswordBtn
        .addEventListener("click", () => {
            hide("login-modal");
            show("forgot-modal");
        });

    // Signup
    const signupBtn2 = document.getElementById("signup-submit");
    signupBtn2
        .addEventListener("click", async () => {
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
    
            await signup(email, password);
        });
    
    const backBtn = document.getElementById("back");
    backBtn
        .addEventListener("click", () => {
            hide("signup-modal");
            show("login-modal");
        });
    
    // Forgot Password
    const forgotSubmitBtn = document.getElementById("forgot-submit");
    forgotSubmitBtn
        .addEventListener("click", () => {
            hide("forgot-modal");
            document.getElementById("reset-modal").classList.remove("hidden");
        });

    const forgotSubmitBtn2 = document.getElementById("forgot-submit");
    forgotSubmitBtn2
        .addEventListener("click", () => {

            const email = document.getElementById("forgot-email").value;

            if (!validUniversityEmail(email)) {
                alert("Use university email");
                return;
            }
        });

    const backBtn2 = document.getElementById("back2");
    backBtn2
        .addEventListener("click", () => {
            hide("forgot-modal");
            show("login-modal");
        });

    
    // Verify Code (placeholder for now) -> backend work needed
    const verifyCodeBtn = document.getElementById("verify-code-submit");
    verifyCodeBtn
        .addEventListener("click", () => {

            //code should be generated and emailed in real app -> backend work needed

            //if (code === ) 
            //{
            //hide("forgot-modal");
            //show("main-app");
            //} 
            //else 
            //{
            //alert("Invalid verification code");
            //}

        });


    const resetSubmitBtn = document.getElementById("reset-submit");
    resetSubmitBtn
        .addEventListener("click", () => {

            const newPassword = document.getElementById("new-password").value;

            if (!validPassword(newPassword)) {
                alert("Password must be 8+ characters");
                return;
            }

            alert("Password reset ready for backend.");
            hide("reset-modal");
            show("login-modal");
        });

    const backBtn3 = document.getElementById("back3");
    backBtn3
        .addEventListener("click", () => {
            hide("reset-modal");
            show("login-modal");
        });
    });
