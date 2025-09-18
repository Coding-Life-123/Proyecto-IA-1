import React from "react";
import { useChat } from "@ai-sdk/react";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    apiKey: "YOUR_API_KEY", // Replace with your actual API key
    model: "grok-4",
    baseURL: "https://api.x.ai/v1",
  });

  return (
    <div className="chat-container">
      <h1>Conversación entre Expertos</h1>
      <div
        className="chat-window"
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <strong>{msg.role.toUpperCase()}:</strong>{" "}
            {Array.isArray(msg.content)
              ? msg.content.map((c) => c.text).join(" ")
              : msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe tu mensaje..."
          style={{ width: "80%", padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 12px", marginLeft: "5px" }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
