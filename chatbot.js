document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chatBox");
    const sendBtn = document.getElementById("sendBtn");
    const messages = document.getElementById("messages");
  
    sendBtn.addEventListener("click", async () => {
      const userMessage = chatBox.value.trim();
      if (!userMessage) return;
  
      appendMessage("You", userMessage);
      chatBox.value = "";
  
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const data = await res.json();
      appendMessage("FrankBot", data.reply);
    });
  
    function appendMessage(sender, text) {
      const msg = document.createElement("div");
      msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  });
  