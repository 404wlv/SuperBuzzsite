/////testing
import { supabase } from "./supabaseClient.js"
import { signup } from "./auth.js"

async function testConnection() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
        console.log("Error connecting:", error)
    } else {
        console.log("Supabase connected successfully")
    }
}

testConnection()



// whatever modal id is passed, toggle its visibility
function hide(id) {
    document.getElementById(id).classList.add("hidden");
}

function show(id) {
    document.getElementById(id).classList.remove("hidden");
}

// simple validation functions for email and password
function validUniversityEmail(email) {
    return email.endsWith("@wlv.ac.uk");
}

function validPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(password);
}

// close buttons for all modals -> need improvements 
document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
        hide(btn.getAttribute("data-close"));
    });
});

// LOGIN
const loginBtn = document.getElementById("login-submit");

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!validUniversityEmail(email)) {
        alert("Use university email!");
        return;
    }

    if (!validPassword(password)) {
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


// Forgot
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

// for later use -> ✖

//sidebar and chatbox toggles
const chatToggleBtn = document.getElementById("chat-toggle");
chatToggleBtn
    .addEventListener("click", () => {
        const element = document.getElementById("chatbox");

        if (element.classList.contains("hidden")) {
            show("chatbox")
        }
        else {
            hide("chatbox")
        }
    });



const sidebarToggleBtn = document.getElementById("sidebar-toggle");
sidebarToggleBtn
    .addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("-translate-x-full");
    });



// bus, gym, library modals
const busBtn = document.getElementById("bus-timings");    
busBtn
    .addEventListener("click", () => {
        show("bus-modal");
    });

const gymBtn = document.getElementById("gym-timings");
gymBtn
    .addEventListener("click", () => {
        show("gym-modal");
    });

const libraryBtn = document.getElementById("library-timings");
libraryBtn
    .addEventListener("click", () => {
        show("library-modal");
    });