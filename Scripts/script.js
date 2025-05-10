document.addEventListener("DOMContentLoaded", () => {
  const newChatButton = document.getElementById("newChatButton");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const welcomeText = document.getElementById("welcome-text");
  const welcomeCard = document.getElementById("welcome-card");
  const chatContent = document.getElementById("chat-content");
  const cards = document.querySelectorAll(".card");

  // Simulate AI response (replace with actual AI API call)
  function getAIResponse(userMessage) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI response to "${userMessage}": This is a placeholder response.`);
      }, 1000);
    });
  }

  function addMessage(content, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "ai"}`;
    messageDiv.textContent = content;
    chatContent.appendChild(messageDiv);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  function startNewChat() {
    chatInput.value = "";
    chatContent.innerHTML = "";
    welcomeText.style.display = "block";
  }

  // Handle sending a message
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) {
      alert("Please enter a message to send.");
      return;
    }

    // Hide welcome text and show user message
    welcomeText.style.display = "none";
    welcomeCard.style.display = "none";
    addMessage(message, true);
    chatInput.value = "";

    // Simulate AI response
    const aiResponse = await getAIResponse(message);
    addMessage(aiResponse, false);
  }

  // New Chat button
  newChatButton.addEventListener("click", startNewChat);

  // Send button
  sendButton.addEventListener("click", sendMessage);

  // Enter key to send
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // Card click to populate input
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      chatInput.value = card.textContent.trim();
      chatInput.focus();
    });
  });
});