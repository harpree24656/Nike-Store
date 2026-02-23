// // Clerk JS SDK
// import { Clerk } from "https://cdn.jsdelivr.net/npm/@clerk/clerk-js@latest/dist/clerk.browser.js";

//   const clerkPubKey = "pk_test_c2V0dGxlZC1kYW5lLTQ2LmNsZXJrLmFjY291bnRzLmRldiQ"; // copy from Clerk dashboard

//   const clerk = new Clerk(clerkPubKey);
//   await clerk.load();

//   const authBox = document.getElementById("auth-box");
//   const signinBtn = document.getElementById("signin-btn");

//   signinBtn.addEventListener("click", () => {
//     if (clerk.isSignedIn) {
//       authBox.innerHTML = `<div id="user-button"></div>`;
//       clerk.mountUserButton(document.getElementById("user-button"));
//     } else {
//       authBox.innerHTML = `<div id="sign-in"></div>`;
//       clerk.mountSignIn(document.getElementById("sign-in"));
//     }
//   });

// for menu bar
const optionsBar = document.querySelector(".options-bar");
const menuBtn = document.querySelector(".menu");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menuBtn.style.display = "none";
    optionsBar.classList.remove("hidden");
  })
}
const cross = document.querySelector(".cross");
if (cross) {
  cross.addEventListener("click", () => {
    optionsBar.classList.add("hidden");
    menuBtn.style.display = "flex";
  })
}

// for form validation
document.addEventListener("DOMContentLoaded", () => {
  let form1 = document.getElementById("form-contact");
  if (!form1) return;
  let outputEmail = document.getElementById("output-email");
  let outputName = document.getElementById("output-name");
  let myName = document.getElementById("name");
  let email = document.getElementById("email");
  let textbox = document.getElementById("textbox")
  let outputbox = document.getElementById("output-textbox")

  form1.addEventListener("submit", async function (e) {
    e.preventDefault();
    let message1 = [];
    let message2 = [];
    let message3 = [];

    if (email.value.trim() === "") {
      message2.push("Email is required");
    } else if (!email.value.includes('@')) {
      message2.push("Email is invalid without @");
    }

    if (myName.value.trim().length < 3) {
      message1.push("Name should be more than 3 letters");
    }

    if (textbox.value.trim().length < 7) {
      message3.push("Suggestion is uncomplete");
    }

    outputEmail.textContent = message2.join(" ");
    outputName.textContent = message1.join(" ");
    outputbox.textContent = message3.join(" ");

    if (message1.length === 0 && message2.length === 0) {
      try {
        const res = await fetch("http://localhost:8000/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: myName.value,
            sugemail: email.value,
            messagebox: textbox.value
          })
        });
        const data = await res.json();
        console.log("server response is ", data);

        alert("Message Successfully Submit");
        form1.reset();
      }
      catch (error) {
        console.log("Server error:", error);
      }
    }

  });
});

// for checkout form validation
document.addEventListener("DOMContentLoaded", () => {
  let checkform = document.getElementById("checkout-page1");
  if (!checkform) return;
  let outputEmail = document.getElementById("product1-email-output");
  let outputName = document.getElementById("product1-card-output");
  let outputExp = document.querySelector(".product1-Exp-output");
  let outputCvv = document.querySelector(".product1-Cvv-output");
  let myNum = document.getElementById("product1-card");
  let email = document.getElementById("product1-email");
  let Expiry = document.getElementById("product1-Exp");
  let Cvv = document.getElementById("product1-Cvv");
  let btn = document.getElementById("checkout-btn");
  let successBox = document.querySelector(".anchor-check");

  checkform.addEventListener("submit", async function (e) {
    e.preventDefault();
    let message1 = [];
    let message2 = [];
    let message3 = [];
    let message4 = [];

    if (email.value.trim() === "") {
      message2.push("Email is required");
    } else if (!email.value.includes('@')) {
      message2.push("Email is invalid without @");
    }

    if (myNum.value.trim() === "") {
      message1.push("Card number is required");
    } else if (myNum.value.trim().length != 12) {
      message1.push("Card should be 12 numbers");
    }

    if (Expiry.value.trim() === "") {
      message3.push("Expiry date is required");
    } else if (Expiry.value.trim().length != 5) {
      message3.push("Expiry date should be in mm/yy format");
    }

    if (Cvv.value.trim() === "") {
      message4.push("CVV is required");
    } else if (Cvv.value.trim().length != 3) {
      message4.push("CVV should be 3 numbers");
    }

    outputEmail.textContent = message2.join(" ");
    outputName.textContent = message1.join(" ");
    outputExp.textContent = message3.join(" ");
    outputCvv.textContent = message4.join(" ");

    // if (message1.length === 0 && message2.length === 0 && message3.length === 0 && message4.length === 0) {
    //   successBox.classList.add("show");
    //   form.reset();
    // }

    if (message1.length === 0 && message2.length === 0 && message3.length === 0 && message4.length === 0) {

      try {

        const res = await fetch("http://localhost:8000/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email.value,
            card: myNum.value,
            expDate: Expiry.value,
            cvv: Cvv.value
          })
        });

        const data = await res.json();
        console.log("Server response:", data);

        successBox.classList.add("show");
        checkform.reset();

      }
      catch (error) {
        console.log("Server error:", error);
      }
    }
  });
});

// for rating
const stars = document.querySelectorAll(".star");
const output = document.getElementById("rating-output");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    // Clear old selection
    stars.forEach(s => s.classList.remove("selected"));

    // Highlight selected stars
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add("selected");
    }

    // Show result
    output.textContent = `You rated this ${index + 1} out of 5`;
  });
});

// tpewritting
const texts = [
  "HAR Store",
  "Shoes Store",
  "Nike Store",
];

let count = 0;
let index = 0;
let currentText = "";
let letter = "";

function typeWriter() {
  if (count === texts.length) {
    count = 0;
  }

  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  //  this will now find your <span id="typewriter">
  const el = document.getElementById("typewriter");
  if (!el) return;
  el.textContent = letter;

  if (letter.length === currentText.length) {
    setTimeout(() => {
      index = 0;
      count++;
      typeWriter();
    }, 2000);
  } else {
    setTimeout(typeWriter, 100);
  }
}

// ensures it runs after <span> exists
document.addEventListener("DOMContentLoaded", typeWriter);

// // blury effect
const blurBtn = document.querySelector(".blur-btn");
const checkout = document.querySelector(".checkout-page");

if (blurBtn && checkout) {
  blurBtn.addEventListener("click", () => {
    checkout.classList.remove("blur");
  });
}


// login system
const formSub = document.querySelector(".contanier-login");
if (formSub) {

  formSub.addEventListener("submit", async (e) => {

    e.preventDefault();

    const loginEmail = document.querySelector(".login-email");
    const loginPass = document.querySelector(".login-password");
    const outputEmail = document.querySelector(".output-email");
    const outputPass = document.querySelector(".output-pass");
    const successBox = document.querySelector(".login-btn");

    let message1 = [];
    let message2 = [];

    if (loginEmail.value.trim() === "") {
      message1.push("Email is required");
    } else if (!loginEmail.value.includes("@")) {
      message1.push("Email is invalid");
    }
    
    if (loginPass.value.trim() === "") {
      message2.push("Password is required");
    }
    else if (loginPass.value.trim().length < 8) {
      message2.push("Password must be at least 8 characters");
    }

    outputEmail.textContent = message1.join(" ");
    outputPass.textContent = message2.join(" ");

    if (message1.length === 0 && message2.length === 0) {
      try {
        const res = await fetch("http://localhost:8000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: loginEmail.value,
            password: loginPass.value
          })
        });
        const data = await res.json();
        console.log("Server response:", data);
        if (res.ok) {
          alert("Registration Successful");
          window.location.href = "index.html";
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.log("Server error:", error);
      }
    }
  });
}