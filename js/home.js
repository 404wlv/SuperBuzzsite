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
              transform transition-all duration-200 bg-black text-white text-xs p-2 rounded bottom-full mb-2 w-48 sm:w-200 z-10">
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

    const titleEl = document.getElementById("event-title");
    const catEl = document.getElementById("event-category");
    const descEl = document.getElementById("event-description");
    const locEl = document.getElementById("event-location");
    const dateEl = document.getElementById("event-date");
    const modal = document.getElementById("event-modal");

    if (!titleEl || !catEl || !descEl || !locEl || !dateEl || !modal) return;

    titleEl.textContent = event.title;
    catEl.textContent = event.category;
    descEl.textContent = event.description;
    locEl.textContent = "Location: " + event.location;
    dateEl.textContent = "Date: " + new Date(event.date).toLocaleString();

    modal.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await protectHomePage();
    if (!allowed) return;

    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("sidebar-toggle");

    let isOpen = true;
    if (toggleBtn) toggleBtn.textContent = "✕";
    sidebar?.classList.remove("-translate-x-full");

    await loadFAQs();
    await loadEvents();

    // chat toggle
    document.getElementById("chat-toggle")?.addEventListener("click", () => {
        document.getElementById("chatbox")?.classList.toggle("hidden");
    });

    // sidebar toggle
    toggleBtn?.addEventListener("click", () => {
        isOpen = !isOpen;

        if (isOpen) {
            sidebar?.classList.remove("-translate-x-full");
            toggleBtn.textContent = "✕";
        } else {
            sidebar?.classList.add("-translate-x-full");
            toggleBtn.textContent = "☰";
        }
    });

    // sidebar buttons
    document.getElementById("profile-button")?.addEventListener("click", () => {
        window.location.href = "profile.html";
    });

    document.getElementById("map-button")?.addEventListener("click", () => {
        window.location.href = "map.html";
    });

    document.getElementById("bus-timings")?.addEventListener("click", () => {
        document.getElementById("bus-modal")?.classList.remove("hidden");
        loadTransport();
    });

    document.getElementById("gym-timings")?.addEventListener("click", () => {
        document.getElementById("gym-modal")?.classList.remove("hidden");
    });

    document.getElementById("library-timings")?.addEventListener("click", () => {
        document.getElementById("library-modal")?.classList.remove("hidden");
    });

    // event modal close
    document.getElementById("close-event-modal")?.addEventListener("click", () => {
        document.getElementById("event-modal")?.classList.add("hidden");
    });

    // create event modal
    const addEventBtn = document.getElementById("add-event-button");
    const createEventModal = document.getElementById("create-event-modal");
    const closeCreateEventModal = document.getElementById("close-create-event-modal");
    const createEventSubmit = document.getElementById("create-event-btn");

    addEventBtn?.addEventListener("click", () => {
        createEventModal?.classList.remove("hidden");
    });

    closeCreateEventModal?.addEventListener("click", () => {
        createEventModal?.classList.add("hidden");
    });

    createEventSubmit?.addEventListener("click", async () => {
        const title = document.getElementById("new-event-title")?.value.trim();
        const category = document.getElementById("new-event-category")?.value;
        const description = document.getElementById("new-event-description")?.value.trim();
        const location = document.getElementById("new-event-location")?.value.trim();
        const date = document.getElementById("new-event-date")?.value;

        if (!title || !category || !description || !location || !date) {
            alert("Please fill all fields!");
            return;
        }

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
            alert("You must be logged in to create an event.");
            window.location.href = "index.html";
            return;
        }

        const { error } = await supabase
            .from("events")
            .insert([{
                title,
                category,
                description,
                location,
                event_date: date,
                created_by: userData.user.id
            }]);

        if (error) {
            console.log("Error creating event:", error);
            alert("Failed to create event.");
            return;
        }

        alert("Event created successfully!");

        document.getElementById("new-event-title").value = "";
        document.getElementById("new-event-description").value = "";
        document.getElementById("new-event-location").value = "";
        document.getElementById("new-event-date").value = "";

        createEventModal?.classList.add("hidden");
        await loadEvents();
    });

    // attendance form
    const attendEventBtn = document.getElementById("attend-btn");
    const closeAttendFormBtn = document.getElementById("close-attend-form");
    const submitAttendBtn = document.getElementById("confirm-attend-btn");

    attendEventBtn?.addEventListener("click", () => {
        if (!selectedEventId) {
            alert("Please select an event first.");
            return;
        }

        document.getElementById("attend-form")?.classList.remove("hidden");
    });

    closeAttendFormBtn?.addEventListener("click", () => {
        document.getElementById("attend-form")?.classList.add("hidden");
    });

    submitAttendBtn?.addEventListener("click", async () => {
        const name = document.getElementById("attendee-name")?.value.trim();
        const email = document.getElementById("attendee-email")?.value.trim();
        const studentId = document.getElementById("attendee-student-id")?.value.trim();
        const course = document.getElementById("attendee-course")?.value.trim();
        const consent = document.getElementById("attendee-consent")?.checked;

        if (!name || !email || !studentId || !course) {
            alert("Please fill all required fields!");
            return;
        }

        if (!consent) {
            alert("You must consent to data processing to attend the event.");
            return;
        }

        if (!selectedEventId) {
            alert("No event selected.");
            return;
        }

        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData.user) {
            alert("You must be logged in to attend an event.");
            window.location.href = "index.html";
            return;
        }

        const user = userData.user;

        const { error } = await supabase
            .from("event_attendance")
            .insert([{
                event_id: selectedEventId,
                user_id: user.id
            }]);

        if (error) {
            console.log("Error saving attendance:", error);

            if (error.code === "23505") {
                alert("You have already registered for this event.");
                return;
            }

            alert("Failed to register attendance.");
            return;
        }

        alert(`Thank you for registering, ${name}! We look forward to seeing you at the event.`);

        document.getElementById("attendee-name").value = "";
        document.getElementById("attendee-email").value = "";
        document.getElementById("attendee-student-id").value = "";
        document.getElementById("attendee-course").value = "";
        document.getElementById("attendee-allergens").value = "";
        document.getElementById("attendee-disabilities").value = "";
        document.getElementById("attendee-consent").checked = false;

        document.getElementById("attend-form")?.classList.add("hidden");
        document.getElementById("event-modal")?.classList.add("hidden");
    });

    // chatbot
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatMessages = document.getElementById("chat-messages");

    function addMessage(text, sender) {
        if (!chatMessages) return;

        const msg = document.createElement("div");
        msg.className = sender === "user"
            ? "text-right bg-[#ACBAC4] text-[#E1D9BC] p-2 rounded my-1"
            : "text-left bg-[#E1D9BC] text-[#30364F] p-2 rounded my-1";
        msg.textContent = text;
        chatMessages.appendChild(msg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotReply(message) {
        const text = message.toLowerCase().trim();

        if (!faqs.length) {
            return "I’m sorry, the FAQ data is not available right now.";
        }

        for (const faq of faqs) {
            const keywordList = faq.keywords
                .split(",")
                .map(word => word.trim().toLowerCase())
                .filter(Boolean);

            for (const word of keywordList) {
                if (text.includes(word) || word.includes(text)) {
                    return faq.answer;
                }
            }
        }

        return "I'm sorry, I couldn't find that information. Please contact support or check the FAQ section for more details.";
    }

    function sendMessage() {
        const message = chatInput?.value.trim();
        if (!message) return;

        addMessage(message, "user");

        const reply = getBotReply(message);

        setTimeout(() => {
            addMessage(reply, "bot");
        }, 500);

        chatInput.value = "";
    }

    chatSend?.addEventListener("click", sendMessage);

    chatInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    // bus timings
    async function loadTransport() {
        const appKey = "bat_5de26858af3ec1f5769df8dccf071920";
        const busList = document.getElementById("bus-list");
        if (!busList) return;

        busList.innerHTML = "<li>Loading transport data...</li>";

        try {
            const stops = { "43000700503": "Stop AB", "43000700504": "Stop AC" };
            let output = "";

            for (const stopId in stops) {
                const res = await fetch(`https://api.busesandtrains.co.uk/v1/stops/${stopId}/departures?app_key=${appKey}`);
                if (!res.ok) {
                    output += `<li>Error loading ${stops[stopId]}</li>`;
                    continue;
                }

                const data = await res.json();
                output += `<li class="font-bold mt-2">🚌 ${stops[stopId]}</li>`;

                const departures = data.departures || [];
                if (departures.length > 0) {
                    departures.slice(0, 5).forEach(dep => {
                        const time = dep.expected || dep.scheduled;
                        output += `<li>${dep.line} → ${dep.destination} at ${new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</li>`;
                    });
                } else {
                    output += `<li>No buses</li>`;
                }
            }

            busList.innerHTML = output;
        } catch (err) {
            console.error(err);
            busList.innerHTML = "<li>Error loading transport data</li>";
        }
    }
});