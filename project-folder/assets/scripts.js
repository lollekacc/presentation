// ===== Header Scroll Effect =====
window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  if (header) header.classList.toggle("shrink", window.scrollY > 120);
});

// ===== AI Chat System =====
function initChat() {
  const chatBox = document.getElementById("chatBox");
  const chatBody = document.getElementById("chatBody");
  const chatInput = document.getElementById("freeSearch");
  const chatBtn = document.getElementById("chatSend");
  const minimizeBtn = document.querySelector(".minimize-btn");

  if (!chatBox || !chatBody || !chatInput || !chatBtn) return;

  // Toggle chat window
  minimizeBtn?.addEventListener("click", () => {
    chatBox.classList.toggle("minimized");
  });

// --- Smarter AI reply with typo correction ---
const botReply = (msg) => {
  msg = msg.toLowerCase().trim();

  // Basic typo correction mapping
  const corrections = {
    helo: "hej",
    helllo: "hej",
    hejsn: "hej",
    famliy: "familj",
    famil: "familj",
    bredbnd: "bredband",
    brradband: "bredband",
    abonemang: "abonnemang",
    abonemng: "abonnemang",
    ofer: "erbjudande",
    erbudande: "erbjudande",
    kundservce: "kundservice",
    kontakta: "kontakt"
  };

  // Auto-correct words
  Object.keys(corrections).forEach((wrong) => {
    if (msg.includes(wrong)) msg = msg.replace(wrong, corrections[wrong]);
  });

  // Remove duplicate spaces and weird chars
  msg = msg.replace(/[^a-zåäö0-9\s]/gi, "").replace(/\s+/g, " ").trim();

  // Then apply same logic as before
  if (/^(hej|hejsan|hello|tja|hi)/.test(msg))
    return "Hej där! 👋 Hur kan jag hjälpa dig idag?";
  if (/hur mår du|how are you/.test(msg))
    return "Jag mår bra, tack! 😊 Hur är det med dig?";
  if (/mobil|abonnemang/.test(msg))
    return "Du kan testa vårt mobilquiz 👉 <a href='quiz-mobil-start.html' class='text-blue-600 underline'>Starta här</a>";
  if (/familj/.test(msg))
    return "Vill du kolla familjeabonnemang? 👉 <a href='quiz-familj-start.html' class='text-blue-600 underline'>Klicka här</a>";
  if (/bredband|5g/.test(msg))
    return "Kolla våra 5G- och bredbandsalternativ 👉 <a href='quiz-bredband.html' class='text-blue-600 underline'>Se här</a>";
  if (/erbjudande|kampanj|bonus/.test(msg))
    return "Se aktuella kampanjer här 👉 <a href='erbjudande.html' class='text-blue-600 underline'>Erbjudanden</a>";
  if (/kundservice|kontakt/.test(msg))
    return "Du kan kontakta oss här 👉 <a href='kundservice.html' class='text-blue-600 underline'>Kundservice</a>";
  if (/om oss/.test(msg))
    return "Läs mer om oss 👉 <a href='om-oss.html' class='text-blue-600 underline'>Om Adeala</a>";
  if (/tack/.test(msg))
    return "Varsågod! 🙌 Jag finns här om du behöver mer hjälp.";
  if (/hjälp|vad kan du/.test(msg))
    return "Jag kan hjälpa dig med abonnemang, quiz, erbjudanden och kundservicefrågor!";

  return "Jag förstod inte helt 😅 men jag kan hjälpa dig hitta rätt abonnemang eller erbjudande!";
};


  // Add message to chat
  const addMessage = (msg, type = "bot") => {
    const div = document.createElement("div");
    div.className = type === "user" ? "user-message" : "bot-message";
    div.innerHTML = `<p>${msg}</p>`;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
  };

  // Handle send
  const sendMessage = () => {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, "user");
    chatInput.value = "";
    setTimeout(() => addMessage(botReply(text), "bot"), 400);
  };

  chatBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}

// Wait until chat is in DOM
function waitForChat() {
  if (document.getElementById("chatSend")) {
    initChat();
  } else {
    setTimeout(waitForChat, 200);
  }
}
waitForChat();
