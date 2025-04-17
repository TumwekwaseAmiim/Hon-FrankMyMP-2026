document.getElementById('sendBtn').addEventListener('click', () => {
  const userMessage = document.getElementById('chatBox').value;
  const messagesContainer = document.getElementById('messages');
  const userMessageDiv = document.createElement('div');
  userMessageDiv.textContent = `You: ${userMessage}`;
  messagesContainer.appendChild(userMessageDiv);

  // Simple response logic for FrankBot
  const botMessageDiv = document.createElement('div');
  if (userMessage.toLowerCase().includes('frank')) {
    botMessageDiv.textContent = `FrankBot: Hon. Frank Tumwebaze is a visionary leader, deeply committed to his community!`;
  } else {
    botMessageDiv.textContent = `FrankBot: Sorry, I don't understand that yet.`;
  }
  messagesContainer.appendChild(botMessageDiv);

  document.getElementById('chatBox').value = '';  // Clear input field
});
