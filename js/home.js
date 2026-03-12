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

    const mapBtn = document.getElementById("map-button");
    if (mapBtn) mapBtn.addEventListener("click", () => window.location.href = "map.html");



    //events

    async function loadEvents() {
    const { data: events, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

    const container = document.getElementById("events-container");
    if (!container) return;

    container.innerHTML = ""; // clear old events
    if (!events || events.length === 0) {
        container.innerHTML = "<p>No events yet</p>";
        return;
    }

    events.forEach(event => {
        const div = document.createElement("div");
        div.className = "bg-white text-fuchsia-800 p-4 rounded shadow";
        div.innerHTML = `
            <h3 class="font-bold">${event.title}</h3>
            <p class="text-sm text-gray-600">${event.category}</p>
            <p>${event.description}</p>
            <p class="text-xs text-gray-500 mt-1">${new Date(event.on).toLocaleString()}</p>
            <p>people registered: ${event.peopleregistered}</p>
            <!-- a href="URL TO FORM"> add the button here </a> -->
            <button class="mt-2 bg-fuchsia-700 text-white px-3 py-1 rounded">Register</button>
        `;
            
        container.appendChild(div);
    });

    loadEvents();
}
    //lib hours
    //const today = new Date().toISOString().split("T")[0];

    //if (libraries["Harrison Library"][today].isOpen) {
        
    //}
});