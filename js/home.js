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

//Load FAQs from Supabase instead of hardcoded
let faqs = [];
async function loadFAQs() {
    const { data, error } = await supabase
        .from("faqs")
        .select("*");

    if (error) {
        console.log("FAQ fetch error:", error);
        return;
    }

    faqs = data.map(faq => ({
        question: faq.question,
        answer: faq.answer,
        keywords: faq.keywords || ""
    }));
}

loadFAQs();

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
function closeAllModals() 
{
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => modal.classList.add("hidden"));
}

//show modal
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.remove("hidden");
}

//hide modal
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) modal.classList.add("hidden");
}

function renderEvents(){
    const container = document.getElementById("event")
    container.innerHTML = ""

    events.forEach(event => {
        const card = document.createElement("div")
        card.className = `group relative p-4 rounded-xl shadow cursor-pointer text-fuchsia-800 ${getCategoryColor(event.category)}`
        card.innerHTML = `
            <h3 class="font-bold">${event.title}</h3>
            <p class="text-sm">${event.category}</p>
            <div class="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded bottom-full mb-2 w-48 z-50">
                ${event.description}
            </div>
        `
        card.addEventListener("click", () => openEventModal(event))
        container.appendChild(card)
    })
}

//opening event details modal -Aafrin
function openEventModal(event){
    document.getElementById("event-title").textContent = event.title
    document.getElementById("event-category").textContent = event.category
    document.getElementById("event-description").textContent = event.description
    document.getElementById("event-location").textContent = "Location: " + event.location
    document.getElementById("event-date").textContent = "Date: " + event.date
    showModal("event-modal")
}

document.addEventListener("DOMContentLoaded", () => {
    closeAllModals();

    //chat, sidebar toggles -Aafrin
    const chatToggleBtn = document.getElementById("chat-toggle");
    const chatBox = document.getElementById("chatbox");
    if (chatToggleBtn) chatToggleBtn.addEventListener("click", () => {
        closeAllModals();
        if(chatBox) chatBox.classList.toggle("hidden");
    });

    const sidebarToggleBtn = document.getElementById("sidebar-toggle");
    const sidebar = document.getElementById("sidebar");
    if (sidebarToggleBtn) sidebarToggleBtn.addEventListener("click", () => {
        closeAllModals();
        if(sidebar) sidebar.classList.toggle("-translate-x-full");
    });

    const sidebarBackBtn = document.getElementById("sidebar-back");
    if (sidebarBackBtn) {
        sidebarBackBtn.addEventListener("click", () => {
            closeAllModals();
            if(sidebar) sidebar.classList.add("-translate-x-full");
        });
    }

    //modal buttons -Aafrin
    const busBtn = document.getElementById("bus-timings");
    if (busBtn) busBtn.addEventListener("click", () => showModal("bus-modal"));

    const gymBtn = document.getElementById("gym-timings");
    if (gymBtn) gymBtn.addEventListener("click", () => showModal("gym-modal"));

    const libraryBtn = document.getElementById("library-timings");
    if (libraryBtn) libraryBtn.addEventListener("click", () => showModal("library-modal"));

    // add close buttons to modals
    document.querySelectorAll(".modal").forEach(modal => {
        const closeBtn = document.createElement("button")
        closeBtn.textContent = "✕"
        closeBtn.className = "absolute top-2 right-2 text-xl text-fuchsia-800 bg-white/20 rounded px-2 py-1 hover:bg-white/40"
        closeBtn.addEventListener("click", () => modal.classList.add("hidden"))
        modal.appendChild(closeBtn)
    })

    //
    const closeModal = document.getElementById("close-event-modal")
    if(closeModal){
        closeModal.addEventListener("click", () => {
            hideModal("event-modal")
        })
    }

    renderEvents()

    //chatbot 
    const chatInput = document.getElementById("chat-input")
    const chatSend = document.getElementById("chat-send")
    const chatMessages = document.getElementById("chat-messages")

    function addMessage(text, sender) {
        const msg = document.createElement("div")
        msg.className = sender === "user"
            ? "text-right bg-blue-500 text-white p-2 rounded my-1"
            : "text-left bg-gray-300 p-2 rounded my-1"
        msg.textContent = text
        chatMessages.appendChild(msg)
        chatMessages.scrollTop = chatMessages.scrollHeight
    }

    function getBotReply(message) {
        const text = message.toLowerCase();
        for (const faq of faqs) {
            if (text.includes(faq.question.toLowerCase())) return faq.answer;
            if (faq.keywords) {
                const keywords = faq.keywords.split(",");
                for (const word of keywords) {
                    if (text.includes(word.trim())) return faq.answer;
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

    //profile
    const profileBtn = document.getElementById("profile-button")
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            window.location.href = "profile.html"
        })
    }

});