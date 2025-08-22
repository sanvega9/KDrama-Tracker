// 🌙 Dark Mode Toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  // Save theme preference
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
});

// 🛸 RSVP Functionality
const rsvpCount = document.getElementById("rsvp-count");
const participantsDiv = document.getElementById("rsvp-participants");
const rsvpButton = document.getElementById("rsvp-button");

let count = participantsDiv.children.length;
rsvpCount.textContent = `⭐ ${count} people have RSVP'd to this event!`;

rsvpButton.addEventListener("click", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const stateInput = document.getElementById("state");
  const emailInput = document.getElementById("email");

  const name = nameInput.value.trim();
  const state = stateInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !state || !email) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const newParticipant = document.createElement("p");
  newParticipant.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;
  newParticipant.classList.add("fade-in");
  participantsDiv.appendChild(newParticipant);

  count++;
  rsvpCount.textContent = `⭐ ${count} people have RSVP'd to this event!`;

  document.getElementById("rsvp-form").reset();
  nameInput.focus();

  // Show the success modal
  toggleModal({ name, state, email });
});

// 🎉 Modal Logic
let rotateFactor = 0;
const modal = document.getElementById("success-modal");
const modalText = document.getElementById("modal-text").querySelector("p");
const modalImage = document.getElementById("modal-image");
const closeModalBtn = document.getElementById("close-modal-btn");

const animateImage = () => {
  rotateFactor = rotateFactor === 0 ? -10 : 0;
  modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

const toggleModal = (person) => {
  modal.style.display = "flex";
  modalText.textContent = `Thanks for RSVPing, ${person.name}! We can’t wait to see you at the event.`;

  let intervalId = setInterval(animateImage, 500);

  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 5000);
};

// ❌ Manual Modal Close
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});
