// =============================
// MODAL CONTROL
// =============================
function toggleModal(id) {
  document.getElementById(id).classList.toggle("hidden");
}

document.getElementById("open-login")
  .addEventListener("click", () => toggleModal("login-modal"));

document.getElementById("open-signup")
  .addEventListener("click", () => toggleModal("signup-modal"));

document.querySelectorAll("[data-close]")
  .forEach(btn => {
    btn.addEventListener("click", () => {
      toggleModal(btn.dataset.close);
    });
  });

// =============================
// POPUP SYSTEM
// =============================
function showPopup(message) {
  const popup = document.getElementById("popup");
  document.getElementById("popup-message").innerText = message;
  popup.classList.remove("hidden");
}

document.getElementById("close-popup")
  .addEventListener("click", () => {
    document.getElementById("popup").classList.add("hidden");
  });

// =============================
// VALIDATION
// =============================
function validPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

// =============================
// LOGIN
// =============================
document.getElementById("login-submit")
  .addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email.endsWith("@wlv.ac.uk")) {
      showPopup("Use your university email.");
      return;
    }

    if (!validPassword(password)) {
      showPopup("Password must contain letter, number, special character and be 8+ chars.");
      return;
    }

    // ======= LOGIN SUCCESS =======
    showPopup("Login successful!");
    document.getElementById("auth-ui").classList.add("hidden");
    document.getElementById("homepage").classList.remove("hidden");
  });

// =============================
// SIGNUP
// =============================
document.getElementById("signup-submit")
  .addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!email.endsWith("@wlv.ac.uk")) {
      showPopup("Use your university email.");
      return;
    }

    if (!validPassword(password)) {
      showPopup("Password must contain letter, number, special character and be 8+ chars.");
      return;
    }

    // ======= SIGNUP SUCCESS =======
    showPopup("Signup successful!");
    document.getElementById("auth-ui").classList.add("hidden");
    document.getElementById("homepage").classList.remove("hidden");
  });