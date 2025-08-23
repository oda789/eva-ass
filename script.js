let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  window.speechSynthesis.cancel(); // stop previous speech
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  text_speak.lang = "en-GB";
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

// When speech is recognized
recognition.onresult = (event) => {
  let transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

// When listening ends
recognition.onend = () => {
  btn.style.display = "block";
  voice.classList.remove("active");
};

// Button click → start listening
btn.addEventListener("click", () => {
  recognition.start();
  btn.style.display = "none";
  voice.classList.add("active");
});

// Commands
function takeCommand(message) {
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who created you")) {
    speak("I was created by Shailesh Sir");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("time")) {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    speak(`The time is ${hours}:${minutes < 10 ? "0"+minutes : minutes} ${ampm}`);
  } else {
    speak(`Searching Google for ${message}`);
    window.open(`https://www.google.com/search?q=${message}`, "_blank");
  }
}



