const OpenAI = window.OpenAI;

const client = new OpenAI({
  apiKey: "YOUR_API_KEY", // Replace with your actual API key
  baseURL: "https://api.x.ai/v1",
  timeout: 3000,
});

const chatDiv = document.getElementById("chat");
const startChatBtn = document.getElementById("startChat");
const experto1Btn = document.getElementById("experto1");
const experto2Btn = document.getElementById("experto2");
const resetBtn = document.getElementById("reset");
const deleteChatBtn = document.getElementById("deleteChat");

let conversation = [];
let currentTurn = null;
let topics = [
  "inmigración",
  "economía",
  "salud pública",
  "educación",
  "medio ambiente",
  "derechos humanos",
];

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.textContent = `${sender.toUpperCase()}: ${text}`;
  chatDiv.appendChild(messageDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function formatContent(content) {
  if (Array.isArray(content)) {
    return content.map((c) => c.text).join(" ");
  }
  return content;
}

async function generateResponse(messages) {
  try {
    const completion = await client.chat.completions.create({
      model: "grok-4",
      messages: messages,
    });
    const message = completion.choices[0].message;
    console.log("Reasoning Content:", message.reasoning_content);
    console.log("\nFinal Response:", message.content);
    console.log(
      "\nNumber of completion tokens (input):",
      completion.usage.completion_tokens
    );
    console.log(
      "\nNumber of reasoning tokens (input):",
      completion.usage.completion_tokens_details.reasoning_tokens
    );
    return formatContent(message.content);
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error al generar respuesta.";
  }
}

async function nextTurn() {
  if (!currentTurn) return;

  const role = currentTurn;
  const systemMessage =
    role === "Derecha"
      ? "Eres un Petrista defendiendo posiciones de derecha en debates políticos."
      : "Eres uno de la Uribista defendiendo posiciones de izquierda en debates políticos.";

  const messages = [
    { role: "system", content: "You are a helpful and funny assistant." },
    { role: "system", content: systemMessage },
    {
      role: "user",
      content: `Debate sobre el tema: ${
        conversation[0].topic
      }.\nHistorial de conversación:\n${conversation
        .slice(1)
        .map((msg) => `${msg.sender}: ${msg.text}`)
        .join("\n")}\nResponde de manera coherente y continúa el debate.`,
    },
  ];

  const response = await generateResponse(messages);
  addMessage(role, response);
  conversation.push({ sender: role, text: response });

  // Switch turn
  currentTurn = currentTurn === "Derecha" ? "Izquierda" : "Derecha";

  // Continue automatically after a short delay for fluency
  setTimeout(nextTurn, 1000);
}

experto1Btn.addEventListener("click", () => {
  if (conversation.length === 0) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    conversation.push({ topic });
    currentTurn = "Derecha";
    nextTurn();
  }
});

experto2Btn.addEventListener("click", () => {
  if (conversation.length === 0) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    conversation.push({ topic });
    currentTurn = "Izquierda";
    nextTurn();
  }
});

resetBtn.addEventListener("click", () => {
  chatDiv.innerHTML = "";
  conversation = [];
  currentTurn = null;
});

startChatBtn.addEventListener("click", () => {
  if (conversation.length === 0) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    conversation.push({ topic });
    currentTurn = Math.random() < 0.5 ? "Derecha" : "Izquierda";
    nextTurn();
  }
});

deleteChatBtn.addEventListener("click", () => {
  chatDiv.innerHTML = "";
});
