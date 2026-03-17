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
    answer: "SuperBuzz is a campus platform that helps students stay updated with events, services, and facilities such as the gym, library, and campus buses."
  },
  {
    question: "Who can use SuperBuzz?",
    answer: "SuperBuzz is designed for students and faculty members on campus. You may need to sign up using your campus account."
  },
  {
    question: "How do I create an account?",
    answer: "Go to the sign up page and register using your student or staff details. Once registered, you can log in and access all features."
  },
  {
    question: "How can I see upcoming campus events?",
    answer: "You can view upcoming and live campus events in the Events on the homepage of the Website."
  },
  {
    question: "Can I create my own campus event?",
    answer: "Yes. Students and staff can submit events through the event creation feature."
  },
  {
    question: "Where can I see gym opening times?",
    answer: "Gym opening hours are available in the Gym section of SuperBuzz."
  },
  {
    question: "How do I check library room availability?",
    answer: "The Library section shows current opening hours and available study rooms."
  },
  {
    question: "Can I track campus bus times?",
    answer: "Yes. Live campus bus times are displayed in the Bus Times section."
  },
  {
    question: "What are SuperBuzz points?",
    answer: "Students can earn points by completing activities or participating in events. These points give you access to discounts and free food/coupons that can be redeemed in the university shops and food places."
  },
  {
    question: "What is the campus map used for?",
    answer: "The interactive campus map helps students locate buildings, facilities, and event locations."
  },
  {
    question: "What does the chatbot do?",
    answer: "The chatbot can answer common student questions and help you find information quickly."
  },
  {
    question: "Who do I contact if something is not working?",
    answer: "If you experience issues, contact the campus support team or use the help section within SuperBuzz."
  }
];

async function loadFAQs() {
  const { data, error } = await supabase
    .from("faqs")
    .select("*");

  if (error) {
    console.log("FAQ fetch error:", error);
    return;
  }

  faqs = data;
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

    document.getElementById("bus-timings").addEventListener("click", () => {
        closeAllModals();
        document.getElementById("bus-modal").classList.remove("hidden");
});

    // const gymBtn = document.getElementById("gym-timings");
    // if (gymBtn) gymBtn.addEventListener("click", () => show("gym-modal"));

    document.getElementById("gym-timings").addEventListener("click", () => {
        closeAllModals();
        document.getElementById("gym-modal").classList.remove("hidden");
});

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

        // removed recursive call
    }

    loadEvents(); // ✅= call once (placed after the function)

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

    if (sender === "user") {
        msg.className = "text-right"
    } else {
        msg.className = "text-left"
    }

    msg.textContent = text

    chatMessages.appendChild(msg)

    chatMessages.scrollTop = chatMessages.scrollHeight
}

function makeitpretty(text, sender)
{
    const msg = document.createElement("div")
    msg.className = sender === "user" ? "text-right" : "text-left"
    msg.classList.add("bg-gray-200", "p-2", "rounded", "my-1", sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300")

}

function getBotReply(message) {

  const text = message.toLowerCase();

  for (const faq of faqs) {

    const keywords = faq.keywords.split(",")

    for (const word of keywords) {
    
    if (text.includes(word.trim())) {
         return faq.answer;
        }
     }
  }

  return "I'm sorry, I couldn't find that information. Please email dummyemail@gmail.com for further assistance.";
}

////function for send ing the message
function sendMessage() {

    const message = chatInput.value.trim()

    if (!message) return

    addMessage(message, "user")
    makeitpretty(message, "user")

    const reply = getBotReply(message)

    setTimeout(() => {
        addMessage(reply, "bot")
        makeitpretty(reply, "bot")
    }, 500)

    chatInput.value = ""
}

/////sending the message and logic for enter key 
//////need to confirm this function again
if (chatSend) {
    chatSend.addEventListener("click", sendMessage)
}

if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
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
document.addEventListener("click", function (event) {

  const busModal = document.getElementById("bus-modal");
  const gymModal = document.getElementById("gym-modal");

  // If user clicks on modal background (not the card)
  if (event.target === busModal) {
    busModal.classList.add("hidden");
  }

  if (event.target === gymModal) {
    gymModal.classList.add("hidden");
  }

});