//imports
import { supabase } from "./supabaseClient.js";

//test connection to supabase
async function testConnection() {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.log("Error connecting:", error);
    } else {
        console.log("Supabase connected successfully");
    }
}

//run the connection test on page load
testConnection();

//Temporary hardcoded events - will be replaced by database content -Aafrin
let events = [
    {
        id:1,
        title:"Freshers Welcome Party",
        category:"social",
        description:"Meet new students, enjoy music and free pizza.",
        location:"Student Union",
        date:"2026-10-12 18:00"
    },
    {
        id:2,
        title:"AI Workshop",
        category:"academic",
        description:"Learn the basics of artificial intelligence.",
        location:"MI102B Alan Turning",
        date:"2026-10-14 14:00"
    },
    {
        id:3,
        title:"Basketball Tournament",
        category:"sports",
        description:"Join the annual campus basketball competition.",
        location:"Sports Centre",
        date:"2026-10-15 16:00"
    },
    {
        id:4,
        title:"Career Networking Night",
        category:"career",
        description:"Meet employers and alumni for networking.",
        location:"MC001 Millenium Building",
        date:"2026-10-20 17:30"
    }
];

//category colors for events -Aafrin -> temporary solution
function getCategoryColor(category) {
    switch(category){
        case "social": return "bg-purple-200";
        case "academic": return "bg-indigo-200";
        case "sports": return "bg-green-200";
        case "career": return "bg-yellow-200";
        default: return "bg-fuchsia-200";
    }   
}

//close modals when clicking outside -Aafrin
function closeAllModals() {
    document.addEventListener("click", (event) => {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(modal => {
            if(event.target === modal){
                modal.classList.add("hidden");
            }
        });
    });
}

//fetch FAQs from Supabase
let faqs = [];
async function loadFAQs() {
    const { data, error } = await supabase.from("faqs").select("*");
    if (error) {
        console.log("FAQ fetch error:", error);
        return;
    }

    faqs = data.map(faq => ({
        answer: faq.answer,
        keywords: faq.keywords || ""
    }));
}
loadFAQs();

//render events cards -Aafrin
function renderEvents(){
    const container = document.getElementById("event")
    container.innerHTML = ""

    events.forEach(event => {
        const card = document.createElement("div")
        card.className = `group relative p-4 rounded-xl shadow cursor-pointer text-fuchsia-800 ${getCategoryColor(event.category)}`
        card.innerHTML = `
            <h3 class="font-bold text-sm sm:text-base">${event.title}</h3>
            <p class="text-xs sm:text-sm">${event.category}</p>
            <div class="absolute hidden opacity-0 scale-90 
              group-hover:opacity-100 group-hover:scale-100
              transform transition-all duration-200 bg-black text-white text-xs p-2 rounded bottom-full mb-2 w-full sm:w-full">
                ${event.description}
            </div>
        `
        card.addEventListener("click", () => openEventModal(event))
        container.appendChild(card)
    })
}

//opening event details modal -Aafrin
function openEventModal(event){
    const titleEl = document.getElementById("event-title")
    const catEl = document.getElementById("event-category")
    const descEl = document.getElementById("event-description")
    const locEl = document.getElementById("event-location")
    const dateEl = document.getElementById("event-date")

    if (!titleEl || !catEl || !descEl || !locEl || !dateEl) return

    titleEl.textContent = event.title
    catEl.textContent = event.category
    descEl.textContent = event.description
    locEl.textContent = "Location: " + event.location
    dateEl.textContent = "Date: " + event.date

    const modal = document.getElementById("event-modal")
    if(modal) modal.classList.remove("hidden")
}


document.addEventListener("DOMContentLoaded", () => {
    closeAllModals();

    //chat, sidebar toggles -Aafrin
    const chatToggleBtn = document.getElementById("chat-toggle");
    if (chatToggleBtn) chatToggleBtn.addEventListener("click", () => {
        closeAllModals();
        const chatModal = document.getElementById("chatbox");
        if (chatModal) chatModal.classList.toggle("hidden");
    });

    const sidebarToggleBtn = document.getElementById("sidebar-toggle");
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", () => {
        closeAllModals();
        const sidebar = document.getElementById("sidebar");
        if (sidebar) sidebar.classList.toggle("-translate-x-full");
    });

    const sidebarBackBtn = document.getElementById("sidebar-back");
    if (sidebarBackBtn) {
        sidebarBackBtn.addEventListener("click", () => {
            closeAllModals();
            const sidebar = document.getElementById("sidebar");
            if (sidebar) sidebar.classList.add("-translate-x-full");
        });
    }

    //modal buttons -Aafrin
    const busBtn = document.getElementById("bus-timings");
    if (busBtn) busBtn.addEventListener("click", () => {
        closeAllModals();
        const busModal = document.getElementById("bus-modal");
        if (busModal) busModal.classList.remove("hidden");
        loadTransport();
    });

    const gymBtn = document.getElementById("gym-timings");
    if (gymBtn) gymBtn.addEventListener("click", () => {
        closeAllModals();
        const gymModal = document.getElementById("gym-modal");
        if (gymModal) gymModal.classList.remove("hidden");
    });

    const libraryBtn = document.getElementById("library-timings");
    if (libraryBtn) libraryBtn.addEventListener("click", () => {
        closeAllModals();
        const libraryModal = document.getElementById("library-modal");
        if (libraryModal) libraryModal.classList.remove("hidden");
    });

    const mapBtn = document.getElementById("map-button");
    if (mapBtn) mapBtn.addEventListener("click", () => {
        closeAllModals();
        window.location.href = "map.html";
    });

    const closeModal = document.getElementById("close-event-modal")
    if(closeModal){
        closeModal.addEventListener("click", () => {
            const modal = document.getElementById("event-modal")
            if(modal) modal.classList.add("hidden")
        })
    }

    renderEvents()

    //add event button popup
    // Create Event popup
    const addEventBtn = document.getElementById("add-event-button");
    const createEventModal = document.getElementById("create-event-modal");
    const closeCreateEventModal = document.getElementById("close-create-event-modal");
    const createEventSubmit = document.getElementById("create-event-btn");

    if (addEventBtn && createEventModal) {
        addEventBtn.addEventListener("click", () => {
            createEventModal.classList.remove("hidden");
        });
    }

    if (closeCreateEventModal) {
        closeCreateEventModal.addEventListener("click", () => {
            createEventModal.classList.add("hidden");
        });
    }

    if (createEventSubmit) {
        createEventSubmit.addEventListener("click", () => {
            const title = document.getElementById("new-event-title").value.trim();
            const category = document.getElementById("new-event-category").value;
            const description = document.getElementById("new-event-description").value.trim();
            const location = document.getElementById("new-event-location").value.trim();
            const date = document.getElementById("new-event-date").value;

            if (!title || !category || !description || !location || !date) {
                alert("Please fill all fields!");
                return;
            }

            const newEvent = { id: events.length + 1, title, category, description, location, date };
            events.push(newEvent);
            renderEvents();
            alert("Event created successfully!");

            // clear inputs
            document.getElementById("new-event-title").value = "";
            document.getElementById("new-event-description").value = "";
            document.getElementById("new-event-location").value = "";
            document.getElementById("new-event-date").value = "";

            createEventModal.classList.add("hidden");

        });
    }

    //event attendance form - Aafrin
    //Show the form
    const attendEventBtn = document.getElementById("attend-btn");
    if (attendEventBtn) {
        attendEventBtn.addEventListener("click", () => {
            const attendForm = document.getElementById("attend-form");
            if (attendForm) attendForm.classList.remove("hidden");
        });
    }

    //Handle form submission
    const submitAttendBtn = document.getElementById("confirm-attend-btn");
    if (submitAttendBtn) {
        submitAttendBtn.addEventListener("click", () => {
            const name = document.getElementById("attendee-name").value.trim();
            const email = document.getElementById("attendee-email").value.trim();
            const studentId = document.getElementById("attendee-student-id").value.trim();
            const course = document.getElementById("attendee-course").value.trim();
            const allergens = document.getElementById("attendee-allergens").value.trim();
            const disabilities = document.getElementById("attendee-disabilities").value.trim();
            const consent = document.getElementById("attendee-consent").checked;

            if (!name || !email || !studentId || !course) {
                alert("Please fill all required fields!");
                return;
            }
            if (!consent) {
                alert("You must consent to data processing to attend the event.");
                return;
            }

            //send data to backend later
            alert(`Thank you for registering, ${name}! We look forward to seeing you at the event.`);
        });
    }

    //chatbot 
    const chatInput = document.getElementById("chat-input")
    const chatSend = document.getElementById("chat-send")
    const chatMessages = document.getElementById("chat-messages")

    function addMessage(text, sender) {
        const msg = document.createElement("div")
        msg.className = sender === "user"
            ? "text-right bg-gray-500 text-fuchsia-200 p-2 rounded my-1"
            : "text-left bg-gray-300 text-fuchsia-600 p-2 rounded my-1"
        msg.textContent = text
        chatMessages.appendChild(msg)
        chatMessages.scrollTop = chatMessages.scrollHeight
    }

    function getBotReply(message) {
        const text = message.toLowerCase();
        for (const faq of faqs) {
            if (faq.keywords) {
                const keywords = faq.keywords.split(",");
                for (const word of keywords) {
                    if (text.includes(word.trim().toLowerCase())) return faq.answer;
                }   
            }
        }
        return "I'm sorry, I couldn't find that information. Please contact support or check the FAQ section for more details.";
    }

    function sendMessage() {
        const message = chatInput.value.trim()
        if (!message) return
        addMessage(message, "user")
        const reply = getBotReply(message)
        setTimeout(() => {
            addMessage(reply, "bot")
        }, 500)
        chatInput.value = ""
    }

    if (chatSend) {
        chatSend.addEventListener("click", sendMessage)
    }

    if (chatInput) {
        chatInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendMessage()
        })
    }

    //bus timings
  
    async function loadTransport() {
        const appKey = "bat_5de26858af3ec1f5769df8dccf071920";
        const busList = document.getElementById("bus-list");
        if (!busList) {Console.log("failed"); return;}

        busList.innerHTML = "<li>Loading transport data...</li>";

        try {
            const stops = { "nwmjdtdt": "Stop AB", "nwmtgjtw": "Stop AC" };
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
                        output += `<li>${dep.line} → ${dep.destination} at ${new Date(time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</li>`;
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
   
    

    //profile
    const profileBtn = document.getElementById("profile-button")
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            window.location.href = "profile.html"
        })
    }


});