import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";

const ChatPage = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // 1. Fetch the specific agent's details
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const foundAgent = allAgents.find((a) => a.id.toString() === agentId);
    setAgent(foundAgent);

    // 2. Load mock initial message from the Bot
    setMessages([
      {
        sender: "Bot",
        text: `Hello! I am your NegotiateAI agent for "${foundAgent?.title}". I've initiated contact with the seller. My target range is ${foundAgent?.range}.`,
        time: "Just now",
      },
    ]);
  }, [agentId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input, time: "Now" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // 3. Simulate the Bot response (Step 6 logic)
    setTimeout(() => {
      const botResponse = {
        sender: "Bot",
        text: "Understood. I will adjust the negotiation strategy based on your feedback.",
        time: "Now",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-[#F4F0E6]">
      <Sidebar />
      <main className="flex-1 flex flex-col p-10">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-[#2D2621]">{agent?.title}</h1>
          <p className="text-sm text-gray-500">
            Status:{" "}
            <span className="text-blue-600 font-bold">{agent?.status}</span>
          </p>
        </header>

        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${m.sender === "You" ? "bg-[#A35831] text-white" : "bg-gray-100 text-gray-800"}`}
                >
                  <p className="text-xs font-bold mb-1 opacity-70">
                    {m.sender}
                  </p>
                  <p>{m.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t flex gap-4 bg-gray-50"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 rounded-xl border border-gray-200 outline-[#A35831]"
              placeholder="Tell your agent to change strategy..."
            />
            <button className="bg-[#A35831] text-white px-6 py-3 rounded-xl font-bold">
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
