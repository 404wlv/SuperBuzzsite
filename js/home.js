import { supabase } from "./supabaseClient.js";

async function testConnection() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.log("Error connecting:", error);
    } else {
        console.log("Supabase connected successfully");
    }
}

testConnection();

function hide(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
}
function show(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
}
function toggle(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("[data-close]").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-close");
            hide(target);
        });
    });

    const chatToggleBtn = document.getElementById("chat-toggle");
    if (chatToggleBtn) chatToggleBtn.addEventListener("click", () => toggle("chatbox"));

    const sidebarToggleBtn = document.getElementById("sidebar-toggle");
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", () => {
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.toggle("-translate-x-full");
    });

    const sidebarBackBtn = document.getElementById("sidebar-back");
    if (sidebarBackBtn) {
        sidebarBackBtn.addEventListener("click", () => {
            const sidebar = document.getElementById("sidebar");
            if (sidebar) sidebar.classList.add("-translate-x-full");
        });
    }

    const busBtn = document.getElementById("bus-timings");
    if (busBtn) busBtn.addEventListener("click", () => show("bus-modal"));

    const gymBtn = document.getElementById("gym-timings");
    if (gymBtn) gymBtn.addEventListener("click", () => show("gym-modal"));

    const libraryBtn = document.getElementById("library-timings");
    if (libraryBtn) libraryBtn.addEventListener("click", () => show("library-modal"));
});