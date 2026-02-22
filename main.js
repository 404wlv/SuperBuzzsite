// whatever modal id is passed, toggle its visibility
function toggleModal(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function validUniversityEmail(email) {
  return email.endsWith(".ac.uk");
}

function validPassword(password) {
  return password.length >= 8;
}

// close buttons for all modals
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    toggleModal(btn.getAttribute("data-close"));
  });
});

// LOGIN
document.getElementById("login-submit").addEventListener("click", () => {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!validUniversityEmail(email)) {
    alert("Use university email (.ac.uk)");
    return;
  }

  if (!validPassword(password)) {
    alert("Password must be at least 8 characters");
    return;
  }

  // SUCCESS → Show Main App
  document.getElementById("login-modal").classList.add("hidden");
  document.getElementById("main-app").classList.remove("hidden");
});


// login side buttons
document.getElementById("login-to-signup")
  .addEventListener("click", () => {
    toggleModal("login-modal");
    toggleModal("signup-modal");
  });

document.getElementById("forgot-password-btn")
  .addEventListener("click", () => {
    toggleModal("login-modal");
    toggleModal("forgot-modal");
  });


// Forgot
document.getElementById("forgot-submit")
  .addEventListener("click", () => {

    const email = document.getElementById("forgot-email").value;

    if (!validUniversityEmail(email)) {
      alert("Use university email");
      return;
    }

    toggleModal("forgot-modal");
    toggleModal("verify-modal");
  });


document.getElementById("verify-submit")
  .addEventListener("click", () => {

    const code = document.getElementById("verify-code").value;

    if (code.length !== 4 || isNaN(code)) {
      alert("Enter valid 4 digit code");
      return;
    }

    toggleModal("verify-modal");
    toggleModal("reset-modal");
  });


document.getElementById("reset-submit")
  .addEventListener("click", () => {

    const newPassword = document.getElementById("new-password").value;

    if (!validPassword(newPassword)) {
      alert("Password must be 8+ characters");
      return;
    }

    alert("Password reset ready for backend.");
    toggleModal("reset-modal");
  });