document.addEventListener("DOMContentLoaded", () => {
  const newChatButton = document.getElementById("newChatButton");
  const sendButton = document.getElementById("send-button");
  const chatInput = document.getElementById("chat-input");
  const welcomeText = document.getElementById("welcome-text");
  const welcomeCard = document.getElementById("welcome-card");
  const chatContent = document.getElementById("chat-content");
  const chatBox = document.getElementById("chat-box");
  const cards = document.querySelectorAll(".card");

  async function getAIResponse(userMessage) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            `AI response to "${userMessage}": This is a placeholder response.`
          );
        }, 1000);
      });
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, something went wrong. Please try again.";
    }
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  }

  function addMessage(content, isUser, isLoading = false) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${isUser ? "user" : "ai"}${
      isLoading ? " loading" : ""
    }`;
    messageDiv.textContent = content;
    chatContent.appendChild(messageDiv);
    scrollToBottom();
  }

  function startNewChat() {
    chatInput.value = "";
    chatContent.innerHTML = "";
    welcomeText.style.display = "block";
    welcomeCard.style.display = "flex";
    chatInput.focus();
    scrollToBottom();
  }

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) {
      alert("Please enter a message to send.");
      return;
    }

    welcomeText.style.display = "none";
    welcomeCard.style.display = "none";
    addMessage(message, true);
    chatInput.value = "";
    chatInput.disabled = true;
    sendButton.disabled = true;

    addMessage("Typing...", false, true);

    const aiResponse = await getAIResponse(message);
    const loadingMessage = chatContent.querySelector(".message.loading");
    if (loadingMessage) {
      chatContent.removeChild(loadingMessage);
    }
    addMessage(aiResponse, false);

    chatInput.disabled = false;
    sendButton.disabled = false;
    chatInput.focus();
  }

  newChatButton.addEventListener("click", startNewChat);

  sendButton.addEventListener("click", sendMessage);

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      chatInput.value = card.textContent.trim();
      chatInput.focus();
    });
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        chatInput.value = card.textContent.trim();
        chatInput.focus();
      }
    });
  });
});
