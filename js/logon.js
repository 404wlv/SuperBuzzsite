import { signup, login, validateUniversityEmail, sendResetEmail } from './auth.js';

// some functions
function hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
}

function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}

// DOM event listeners
document.addEventListener("DOMContentLoaded", () => {

    // LOGIN
    const loginBtn = document.getElementById("login-submit");
    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            if (!validateUniversityEmail(email)) {
                alert("Use university email!");
                return;
            }

            if (!password.trim()) {
                alert("Please enter your password.");
                return;
            }
            const captchaResponse = grecaptcha.getResponse();
            if (!captchaResponse) {
                alert("Please complete the captcha");
                return;
            }
            const success = await login(email, password);
            if (success) {
                hide("login-modal");
                window.location.href = "home.html";
            }
        });
    }

    // LOGIN → SIGNUP
    const signupBtn = document.getElementById("login-to-signup");
    if (signupBtn) {
        signupBtn.addEventListener("click", () => {
            hide("login-modal");
            show("signup-modal");
        });
    }

    // LOGIN → FORGOT
    const forgotBtn = document.getElementById("forgot-password-btn");
    if (forgotBtn) {
        forgotBtn.addEventListener("click", () => {
            hide("login-modal");
            show("forgot-modal");
        });
    }

    // SIGNUP
    const signupSubmitBtn = document.getElementById("signup-submit");
    if (signupSubmitBtn) {
        signupSubmitBtn.addEventListener("click", async () => {
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;

            const success = await signup(email, password);
            if (success) {
                hide("signup-modal");
                show("login-modal");
            }
        });
    }

    // SIGNUP → BACK
    const backBtn = document.getElementById("back");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            hide("signup-modal");
            show("login-modal");
        });
    }

    // FORGOT → BACK
    const backBtn2 = document.getElementById("back2");
    if (backBtn2) {
        backBtn2.addEventListener("click", () => {
            hide("forgot-modal");
            show("login-modal");
        });
    }

    // FORGOT → SEND RESET EMAIL
    const forgotSubmitBtn = document.getElementById("forgot-submit");
    if (forgotSubmitBtn) {
        forgotSubmitBtn.addEventListener("click", async () => {
            const email = document.getElementById("forgot-email").value;

            if (!validateUniversityEmail(email)) {
                alert("Use university email");
                return;
            }

            const success = await sendResetEmail(email);
            if (success) {
                alert("Password reset email sent. Please check your inbox and spam folder, then use the reset link in the email.");
                hide("forgot-modal");
                show("login-modal");
            }
        });
    }
});