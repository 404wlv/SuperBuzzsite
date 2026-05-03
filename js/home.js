//imports
import { supabase } from "./supabaseClient.js";

// protect session
async function protectHomePage() {
    const { data, error } = await supabase.auth.getSession();

    if (error || !data.session) {
        console.log("No session, redirecting...");
        window.location.href = "index.html";
        return false;
    }

    return true;
}

// listen for logout/session changes
supabase.auth.onAuthStateChange((event, session) => {
    if (!session) {
        window.location.href = "index.html";
    }
});

// test connection to supabase
async function testConnection() {
    const { error } = await supabase.auth.getSession();

    if (error) {
        console.log("Error connecting:", error);
    } else {
        console.log("Supabase connected successfully");
    }
}

testConnection();

// Events
let events = [];
let selectedEventId = null;

// category colors
function getCategoryColor(category) {
    switch (category) {
        case "social": return "bg-purple-200";
        case "academic": return "bg-indigo-200";
        case "sports": return "bg-green-200";
        case "career": return "bg-yellow-200";
        default: return "bg-fuchsia-200";
    }
}

// FAQs
let faqs = [];

async function loadFAQs() {
    const { data, error } = await supabase
        .from("faqs")
        .select("answer, keywords");

    if (error) {
        console.log("FAQ fetch error:", error);
        return;
    }

    faqs = (data || []).map(faq => ({
        answer: faq.answer || "",
        keywords: faq.keywords || ""
    }));
}

// Events
async function loadEvents() {
    const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

    if (error) {
        console.log("Events fetch error:", error);
        return;
    }

    events = data.map(event => ({
        id: event.id,
        title: event.title,
        category: event.category,
        description: event.description,
        location: event.location,
        date: event.event_date
    }));

    renderEvents();
}

// render events
function renderEvents() {
    const container = document.getElementById("event");
    if (!container) return;

    container.innerHTML = "";

    events.forEach(event => {
        const card = document.createElement("div");
        card.className = `group relative p-4 rounded-xl shadow cursor-pointer text-fuchsia-800 ${getCategoryColor(event.category)}`;

        card.innerHTML = `
            <h3 class="font-bold text-sm sm:text-base">${event.title}</h3>
            <p class="text-xs sm:text-sm">${event.category}</p>
            <div class="absolute hidden opacity-0 scale-90 
              group-hover:opacity-100 group-hover:scale-100
              transform transition-all duration-200 bg-black text-white text-xs p-2 rounded bottom-full mb-2 w-48 sm:w-200">
                ${event.description}
            </div>
        `;

        card.addEventListener("click", () => openEventModal(event));
        container.appendChild(card);
    });
}

// open modal
function openEventModal(event) {
    selectedEventId = event.id;

    document.getElementById("event-title").textContent = event.title;
    document.getElementById("event-category").textContent = event.category;
    document.getElementById("event-description").textContent = event.description;
    document.getElementById("event-location").textContent = "Location: " + event.location;
    document.getElementById("event-date").textContent = "Date: " + event.date;

    document.getElementById("event-modal").classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", async () => {

    const allowed = await protectHomePage();
    if (!allowed) return;

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");

    // Sidebar default OPEN
    let isOpen = true;
    if (toggleBtn) toggleBtn.textContent = "✕";

    // Ensure visible on load
    sidebar?.classList.remove("-translate-x-full");

    await loadFAQs();
    await loadEvents();

    function closeAllModals() {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(m => m.classList.add("hidden"));
    }

    // chat toggle
    document.getElementById("chat-toggle")?.addEventListener("click", () => {
        closeAllModals();
        document.getElementById("chatbox")?.classList.toggle("hidden");
    });

    toggleBtn?.addEventListener("click", () => {
        closeAllModals();

        isOpen = !isOpen;

        if (isOpen) {
            sidebar?.classList.remove("-translate-x-full");
            toggleBtn.textContent = "✕";
        } else {
            sidebar?.classList.add("-translate-x-full");
            toggleBtn.textContent = "☰";
        }
    });

});