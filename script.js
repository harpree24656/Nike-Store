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
const cross = document.querySelector(".cross");

menuBtn.addEventListener("click", () => {
  menuBtn.style.display = "none";
  optionsBar.classList.remove("hidden");
})
cross.addEventListener("click", () => {
  optionsBar.classList.add("hidden");
  menuBtn.style.display = "flex";
})

// for form validation
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("form-contact");
  let outputEmail = document.getElementById("output-email");
  let outputName = document.getElementById("output-name");
  let myName = document.getElementById("name");
  let email = document.getElementById("email");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let message1 = [];
    let message2 = [];

    if (email.value.trim() === "") {
      message2.push("Email is required");
    } else if (!email.value.includes('@')) {
      message2.push("Email is invalid without @");
    }

    if (myName.value.trim().length < 3) {
      message1.push("Name should be more than 3 letters");
    }

    outputEmail.textContent = message2.join(" ");
    outputName.textContent = message1.join(" ");

    if (message1.length === 0 && message2.length === 0) {
      alert("Message Successfully Submit");
      form.reset();
    }
  });
});

// for checkout form validation
document.addEventListener("DOMContentLoaded", () => {
  let form = document.getElementById("checkout-page");
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

  form.addEventListener("submit", function (e) {
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

    if (message1.length === 0 && message2.length === 0 && message3.length === 0 && message4.length === 0) {
      successBox.classList.add("show");
      form.reset();
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

  // ✅ this will now find your <span id="typewriter">
  document.getElementById("typewriter").textContent = letter;

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

// ✅ ensures it runs after <span> exists
document.addEventListener("DOMContentLoaded", typeWriter);

// // blury effect
const blurBtn = document.querySelector(".blur-btn");
const checkout = document.querySelector(".checkout-page")

blurBtn.addEventListener("click", () => {
  checkout.classList.remove("blur"); 
})