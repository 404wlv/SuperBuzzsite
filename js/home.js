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

let faqs = [
{
    question: "What is SuperBuzz?",
    answer: "SuperBuzz is a campus platform that helps students stay updated with events, services and campus facilities.",
    keywords: "superbuzz,app,platform,website"
},
{
    question: "Who can use SuperBuzz?",
    answer: "SuperBuzz is designed for university students and faculty members.",
    keywords: "who,use,students,staff,faculty"
},
{
    question: "How do I create an account?",
    answer: "You can create an account on the sign up page using your university email.",
    keywords: "account,signup,register,login"
},
{
    question: "Where can I see events?",
    answer: "All upcoming campus events are displayed on the home page.",
    keywords: "events,activities,things happening"
},
{
    question: "Can I create an event?",
    answer: "Yes. Students and staff can submit events using the Create Event button.",
    keywords: "create,event,host,organise"
},
{
    question: "Where can I see gym timings?",
    answer: "Gym opening hours are available in the Gym section.",
    keywords: "gym,fitness,workout"
},
{
    question: "How do I check library availability?",
    answer: "The library section shows study room availability and opening times.",
    keywords: "library,study,rooms"
},
{
    question: "How do I track campus buses?",
    answer: "Live bus departure times are available in the Bus Timings section.",
    keywords: "bus,transport,shuttle"
},
{
    question: "What are SuperBuzz points?",
    answer: "Points are rewards earned by participating in events and activities. They can be redeemed at campus cafes or shops.",
    keywords: "points,rewards,redeem"
},
{
    question: "What does the chatbot do?",
    answer: "The chatbot answers common questions and helps students find information quickly.",
    keywords: "chatbot,help,assistant"
}
]

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

    // const busBtn = document.getElementById("bus-timings");
    // if (busBtn) busBtn.addEventListener("click", () => show("bus-modal"));

    const busBtn = document.getElementById("bus-timings");
    if (busBtn) {
        busBtn.addEventListener("click", () => {
        closeAllModals();
        const busModal = document.getElementById("bus-modal");
        if (busModal) busModal.classList.remove("hidden");
        });
    }


    // const gymBtn = document.getElementById("gym-timings");
    // if (gymBtn) gymBtn.addEventListener("click", () => show("gym-modal"));

    const gymBtn = document.getElementById("gym-timings");
    if (gymBtn) {
        gymBtn.addEventListener("click", () => {
        closeAllModals();
        const gymModal = document.getElementById("gym-modal");
        if (gymModal) gymModal.classList.remove("hidden");
    });
    }


    const libraryBtn = document.getElementById("library-timings");
    if (libraryBtn) libraryBtn.addEventListener("click", () => {
        closeAllModals();
        const libraryModal = document.getElementById("library-modal");
        if (libraryModal) libraryModal.classList.remove("hidden");
    });

    const mapBtn = document.getElementById("map-button");
    if (mapBtn) mapBtn.addEventListener("click", () => window.location.href = "map.html");

    const events = [
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
]

    function getCategoryColor(category) {

        switch(category){

            case "social":
            return "bg-fuchsia-200"

            case "academic":
            return "bg-indigo-200"

            case "sports":
            return "bg-green-200"

            case "career":
            return "bg-yellow-200"

            default:
            return "bg-purple-200"

        }   
    }
    //events
    function renderEvents(){

        const container = document.getElementById("events-container")

        container.innerHTML = ""

        events.forEach(event => {

            const card = document.createElement("div")

            card.className =
            `group relative p-4 rounded-xl shadow cursor-pointer text-fuchsia-800 ${getCategoryColor(event.category)}`

            card.innerHTML = `
            <h3 class="font-bold">${event.title}</h3>
            <p class="text-sm">${event.category}</p>

            <div class="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded bottom-full mb-2 w-48">
            ${event.description}
            </div>
            `

            card.addEventListener("click", () => openEventModal(event))

            container.appendChild(card)

        })
    }

    function openEventModal(event){

        document.getElementById("modal-title").textContent = event.title
        document.getElementById("modal-category").textContent = event.category
        document.getElementById("modal-description").textContent = event.description
        document.getElementById("modal-location").textContent = "Location: " + event.location
        document.getElementById("modal-date").textContent = "Date: " + event.date

        document.getElementById("event-modal").classList.remove("hidden")

    }
    const closeModal = document.getElementById("close-event-modal")

        if(closeModal){

        closeModal.addEventListener("click", () => {

        document.getElementById("event-modal").classList.add("hidden")

        })

    }
    renderEvents()

    //lib hours
    //const today = new Date().toISOString().split("T")[0];

    //if (libraries["Harrison Library"][today].isOpen) {

    //}
});

const profileBtn = document.getElementById("profile-button")

if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        window.location.href = "profile.html"
    })
}

/////chatbot logics
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

    if (text.includes(faq.question.toLowerCase())) {
      return faq.answer;
    }

    if (faq.keywords) {
      const keywords = faq.keywords.split(",");

      for (const word of keywords) {
        if (text.includes(word.trim())) {
          return faq.answer;
        }
      }
    }
  }

  return "I'm sorry, I couldn't find that information. Please contact support or check the FAQ section for more details.";
}

////function for send ing the message
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

/////sending the message and logic for enter key 
//////need to confirm this function again
if (chatSend) {
    chatSend.addEventListener("click", sendMessage)
}

if (chatInput) {
    chatInput.addEventListener("keydown" || "keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage()
        }
    })
}


/////for fixing overlapoping all teh models
function closeAllModals() {
  document.getElementById("bus-modal").classList.add("hidden");
  document.getElementById("gym-modal").classList.add("hidden");
  document.getElementById("library-modal").classList.add("hidden");
}


////function for closing the tabs
document.addEventListener("click", (event) => {
    const modals = ["bus-modal", "gym-modal", "library-modal"];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal && event.target === modal) {
            modal.classList.add("hidden");
        }
    });


document.getElementById("attend-button").addEventListener("click", () => {
    // mark attended, update points, show toast, also check if button exists 
});






});