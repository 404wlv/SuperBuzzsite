// whatever modal id is passed, toggle its visibility
function hide(id) {
  document.getElementById(id).classList.toggle("hidden");
}

function show(id) {
  document.getElementById(id).classList.remove("hidden");
}

// simple validation functions for email and password
function validUniversityEmail(email) {
  return email.endsWith("@wlv.ac.uk");
}

function validPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
  return regex.test(password);
}

// close buttons for all modals -> need improvements 
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => {
    hide(btn.getAttribute("data-close"));
  });
});

// LOGIN
document.getElementById("login-submit").addEventListener("click", () => {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  if (!validUniversityEmail(email)) {
    alert("Use university email!");
    return;
  }

  if (!validPassword(password)) {
    alert("Password must be at least 8 characters, include uppercase + lowercase letters and numbers");
    return;
  }

  // SUCCESS → Show Main App
  hide("login-modal");
  show("main-app");
});


// login side buttons
document.getElementById("login-to-signup")
  .addEventListener("click", () => {
    hide("login-modal");
    show("signup-modal");
  });

document.getElementById("forgot-password-btn")
  .addEventListener("click", () => {
    hide("login-modal");
    show("forgot-modal");
  });


// Signup
document.getElementById("signup-submit")
  .addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    if (!validUniversityEmail(email)) {
      alert("Use university email");
      return;
    } 
    else if (!validPassword(password)) {
      alert("Password must be 8+ characters, include uppercase + lowercase letters and numbers");
      return;
    }

    alert("Signup ready for backend.");
    hide("signup-modal");
    show("main-app");
  });


// Forgot
document.getElementById("forgot-reset")
  .addEventListener("click", () => {
    hide("forgot-modal");
    document.getElementById("reset-modal").classList.remove("hidden");
  });

document.getElementById("forgot-submit")
  .addEventListener("click", () => {

    const email = document.getElementById("forgot-email").value;

    if (!validUniversityEmail(email)) {
      alert("Use university email");
      return;
    }
  });

document.getElementById("verify-code-submit")
  .addEventListener("click", () => 
  {
    
    //code should be generated and emailed in real app -> backend work needed

    //if (code === ) 
    //{
      //hide("forgot-modal");
      //show("main-app");
    //} 
    //else 
    //{
      //alert("Invalid verification code");
    //}
  });



document.getElementById("reset-submit")
  .addEventListener("click", () => {

    const newPassword = document.getElementById("new-password").value;

    if (!validPassword(newPassword)) {
      alert("Password must be 8+ characters");
      return;
    }

    alert("Password reset ready for backend.");
    hide("reset-modal");
    show("login-modal");
  });