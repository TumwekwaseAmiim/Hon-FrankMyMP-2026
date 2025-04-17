// Initialize likes count from localStorage
let likesCount = parseInt(localStorage.getItem("likesCount")) || 0;

// Update likes count display
function updateLikes() {
  document.getElementById("likeCount").textContent = `Likes: ${likesCount}`;
}

// Handle like button click
document.getElementById("likeBtn").addEventListener("click", function () {
  if (!localStorage.getItem("liked")) {
    likesCount++;
    localStorage.setItem("likesCount", likesCount);
    localStorage.setItem("liked", "true");
    updateLikes();
    this.disabled = true;
  }
});

// Display initial likes
updateLikes();

// Chat bot response
document.getElementById("chatSendBtn").addEventListener("click", function () {
  const chatInput = document.getElementById("chatInput");
  const chatDisplay = document.getElementById("chatDisplay");

  const inputValue = chatInput.value.trim();
  if (inputValue) {
    // Display user message
    const userMessage = document.createElement("p");
    userMessage.className = "user-msg";
    userMessage.textContent = `You: ${inputValue}`;
    chatDisplay.appendChild(userMessage);

    // Prepare bot response
    const botMessage = document.createElement("p");
    botMessage.className = "bot-msg";
    let response;

    if (inputValue.toLowerCase().includes("frank") || inputValue.toLowerCase().includes("hon")) {
      response = "Bot: I'm here to share the incredible work Hon. Frank Tumwebaze has done for Kibale East! He's a dedicated leader who has lobbied for scholarships, built vital roads, supported youth groups with his personal resources, and built schools and religious structures. His leadership has empowered our community and brought about lasting change. Let's continue supporting him as he leads us toward a brighter future in 2026!";
    } else if (inputValue.toLowerCase().includes("likes") || inputValue.toLowerCase().includes("support")) {
      response = "Bot: Thank you for supporting Frank Tumwebaze! Every like counts towards building a stronger voice for 2026. Keep spreading the message!";
    } else {
      response = "Bot: Your idea is good! But what I know about Frank is: He has transformed Kibale East, empowered the youth, and promoted education and agriculture. Let’s stand with him!";
    }

    botMessage.textContent = response;
    chatDisplay.appendChild(botMessage);
    chatInput.value = "";
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  }
});
