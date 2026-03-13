const faqs = [
  {
    keywords: ["library", "library hours"],
    answer: "Harrison Library is open from 8:00 AM to 10:00 PM."
  },
  {
    keywords: ["gym", "gym hours"],
    answer: "The university gym is open from 6:00 AM to 11:00 PM."
  },
  {
    keywords: ["bus", "bus timing", "bus schedule"],
    answer: "Campus buses run every 20 minutes during weekdays."
  },
  {
    keywords: ["wifi", "internet"],
    answer: "Campus WiFi is available across all university buildings."
  }
];

const fallback =
  "I'm sorry, I couldn't find that information. Please email dummyemail@gmail.com for further assistance.";

// Chat elements
const chatToggle = document.getElementById("chat-toggle");
const chatbox = document.getElementById("chatbox");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Sidebar elements
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const sidebarBack = document.getElementById("sidebar-back");

// Modal elements
const gymModal = document.getElementById("gym-modal");
const busModal = document.getElementById("bus-modal");
const libraryModal = document.getElementById("library-modal");

const gymButton = document.getElementById("gym-timings");
const busButton = document.getElementById("bus-timings");
const libraryButton = document.getElementById("library-timings");

// Chat toggle
chatToggle.addEventListener("click", () => {
  chatbox.classList.toggle("hidden");
});

// Sidebar open
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.remove("-translate-x-full");
});

// Sidebar close
sidebarBack.addEventListener("click", () => {
  sidebar.classList.add("-translate-x-full");
});

// Add message
function addMessage(text, sender = "bot") {
  const msg = document.createElement("div");

  msg.className =
    sender === "user"
      ? "self-end bg-fuchsia-800 text-white px-3 py-2 rounded-xl max-w-[80%]"
      : "self-start bg-fuchsia-100 text-fuchsia-800 px-3 py-2 rounded-xl max-w-[80%]";

  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// FAQ lookup
function getFaqAnswer(userText) {
  const text = userText.toLowerCase();

  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (text.includes(keyword)) {
        return faq.answer;
      }
    }
  }

  return fallback;
}

// Send message
function sendMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  const reply = getFaqAnswer(userText);

  setTimeout(() => {
    addMessage(reply, "bot");
  }, 300);

  chatInput.value = "";
}

chatSend.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Modal helpers
function openModal(modal) {
  modal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
}

function closeAllModals() {
  closeModal(gymModal);
  closeModal(busModal);
  closeModal(libraryModal);
}

// Open modals
gymButton.addEventListener("click", () => {
  closeAllModals();
  openModal(gymModal);
});

busButton.addEventListener("click", () => {
  closeAllModals();
  openModal(busModal);
});

libraryButton.addEventListener("click", () => {
  closeAllModals();
  openModal(libraryModal);
});

// Close modals when clicking outside
[gymModal, busModal, libraryModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Escape key closes modals and sidebar
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllModals();
    sidebar.classList.add("-translate-x-full");
  }
});