/////testing
import { supabase } from "./supabaseClient.js"

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



document.addEventListener("DOMContentLoaded", () => {
    
    // close buttons for all modals -> need improvements 
    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
            hide(btn.getAttribute("data-close"));
        });
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
});
