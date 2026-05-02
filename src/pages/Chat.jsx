import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";
import {
  Send,
  XCircle,
  CheckCircle,
  PauseCircle,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

const Chat = () => {
  const { agentId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Chat");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [agent, setAgent] = useState(null);
  const bottomRef = useRef(null);

  const isSeller = user?.role === "seller";
  const isBuyer = user?.role === "buyer";

  // Load agent info
  useEffect(() => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const current = allAgents.find((a) => a.id === parseInt(agentId));
    if (current) setAgent(current);
  }, [agentId]);

  // Poll messages from shared localStorage every 800ms
  useEffect(() => {
    const load = () => {
      const chats = JSON.parse(localStorage.getItem("chats") || "{}");
      setMessages(chats[parseInt(agentId)] || []);
    };
    load();
    const interval = setInterval(load, 800);
    return () => clearInterval(interval);
  }, [agentId]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Also refresh agent status
  useEffect(() => {
    const interval = setInterval(() => {
      const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
      const current = allAgents.find((a) => a.id === parseInt(agentId));
      if (current) setAgent(current);
    }, 800);
    return () => clearInterval(interval);
  }, [agentId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msg = {
      id: Date.now(),
      sender: isSeller ? "seller" : "buyer",
      senderName: user.fullName || user.email,
      senderEmail: user.email,
      text: input.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    const key = parseInt(agentId);
    chats[key] = [...(chats[key] || []), msg];
    localStorage.setItem("chats", JSON.stringify(chats));

    // Also update agent status to NEGOTIATING if it was WAITING
    if (isBuyer) {
      const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
      const updated = allAgents.map((a) =>
        a.id === key && a.status === "WAITING"
          ? { ...a, status: "NEGOTIATING" }
          : a,
      );
      localStorage.setItem("agents", JSON.stringify(updated));
    }

    setInput("");
  };

  const updateAgentStatus = (status, toastMsg, toastType = "success") => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const updated = allAgents.map((a) =>
      a.id === parseInt(agentId) ? { ...a, status } : a,
    );
    localStorage.setItem("agents", JSON.stringify(updated));
    setAgent((prev) => ({ ...prev, status }));

    // Add a system message
    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    const key = parseInt(agentId);
    const sysMsg = {
      id: Date.now(),
      sender: "system",
      text: toastMsg,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    chats[key] = [...(chats[key] || []), sysMsg];
    localStorage.setItem("chats", JSON.stringify(chats));

    if (toastType === "error") toast.error(toastMsg);
    else if (toastType === "warning") toast(toastMsg, { icon: "⏸️" });
    else toast.success(toastMsg);

    // Navigate away after a short delay
    setTimeout(() => {
      navigate(isSeller ? "/dashboard/seller" : "/dashboard/buyer");
    }, 1000);
  };

  const handleApprove = () =>
    updateAgentStatus("APPROVED", "Deal Approved! 🎉");
  const handleHold = () =>
    updateAgentStatus("ON_HOLD", "Negotiation put on hold.", "warning");
  const handleCancel = () =>
    updateAgentStatus("REJECTED", "Deal Cancelled.", "error");

  // Determine alignment: buyer's messages on right, seller's on left
  const getAlignment = (msg) => {
    if (msg.sender === "system") return "center";
    if (isBuyer) return msg.sender === "buyer" ? "right" : "left";
    if (isSeller) return msg.sender === "seller" ? "right" : "left";
    return "left";
  };

  const getSenderLabel = (msg) => {
    if (msg.sender === "buyer") return isBuyer ? "You" : "Buyer";
    if (msg.sender === "seller")
      return isSeller ? "You" : msg.senderName || "Seller";
    return "";
  };

  const statusColor = {
    NEGOTIATING: "text-blue-600 bg-blue-50",
    ON_HOLD: "text-yellow-600 bg-yellow-50",
    APPROVED: "text-green-600 bg-green-50",
    REJECTED: "text-red-600 bg-red-50",
    WAITING: "text-orange-600 bg-orange-50",
  };

  const chatLocked =
    agent?.status === "APPROVED" || agent?.status === "REJECTED";

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col h-full bg-white border-l border-gray-100">
        {/* Header */}
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                navigate(isSeller ? "/dashboard/seller" : "/dashboard/buyer")
              }
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 transition-all"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="bg-[#A35831] text-white p-2 rounded-lg">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="font-bold text-[#2D2621]">
                {agent?.title || "Negotiation"}
              </h2>
              <div className="flex items-center gap-3 mt-0.5">
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Budget: ${agent?.range}
                </p>
                {agent?.status && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[agent.status]}`}
                  >
                    {agent.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Seller-only action buttons */}
          {isSeller && !chatLocked && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleHold}
                className="flex items-center gap-2 text-yellow-600 font-bold text-sm hover:bg-yellow-50 px-4 py-2 rounded-lg transition-all border border-yellow-100"
              >
                <PauseCircle size={16} /> Hold
              </button>
              <button
                onClick={handleApprove}
                className="flex items-center gap-2 text-green-600 font-bold text-sm hover:bg-green-50 px-4 py-2 rounded-lg transition-all border border-green-100"
              >
                <CheckCircle size={16} /> Approve
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-all border border-red-100"
              >
                <XCircle size={16} /> Cancel
              </button>
            </div>
          )}

          {/* Buyer can also cancel */}
          {isBuyer && !chatLocked && (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-red-500 font-bold text-sm hover:bg-red-50 p-2 px-4 rounded-lg transition-all"
            >
              <XCircle size={18} /> Cancel Deal
            </button>
          )}

          {chatLocked && (
            <div
              className={`text-sm font-bold px-4 py-2 rounded-lg ${statusColor[agent?.status]}`}
            >
              {agent?.status === "APPROVED"
                ? "✅ Deal Approved"
                : "❌ Deal Cancelled"}
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-5 bg-[#FFFDF8]">
          {messages.length === 0 && (
            <div className="text-center text-gray-300 text-sm mt-20">
              {isBuyer
                ? "Waiting for a seller to join and start negotiating..."
                : "You've joined this negotiation. Start by sending your offer."}
            </div>
          )}

          {messages.map((m) => {
            const align = getAlignment(m);

            if (align === "center") {
              return (
                <div key={m.id} className="flex justify-center">
                  <div className="bg-gray-100 text-gray-500 text-xs font-medium px-4 py-2 rounded-full">
                    {m.text}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex flex-col gap-1 ${align === "right" ? "items-end" : "items-start"}`}
              >
                <p className="text-[10px] font-bold text-gray-400 uppercase px-1">
                  {getSenderLabel(m)}
                </p>
                <div
                  className={`max-w-[68%] p-4 rounded-2xl shadow-sm ${
                    align === "right"
                      ? "bg-[#A35831] text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-[#2D2621] rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.text}</p>
                  <p
                    className={`text-[10px] mt-2 font-bold ${
                      align === "right" ? "text-white/60" : "text-gray-400"
                    }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        {!chatLocked ? (
          <form
            onSubmit={sendMessage}
            className="p-6 border-t bg-gray-50 flex gap-4"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-4 bg-white border border-gray-100 rounded-xl focus:outline-[#A35831] text-sm"
              placeholder={
                isSeller
                  ? "Type your offer or message to the buyer..."
                  : "Type your reply or counter-offer..."
              }
            />
            <button
              type="submit"
              className="bg-[#A35831] text-white px-8 rounded-xl font-bold hover:bg-[#8B4A29] hover:shadow-lg transition-all"
            >
              <Send size={18} />
            </button>
          </form>
        ) : (
          <div className="p-6 border-t bg-gray-50 text-center text-gray-400 text-sm font-medium">
            This negotiation is{" "}
            {agent?.status === "APPROVED" ? "approved" : "closed"}. No further
            messages.
          </div>
        )}
      </main>
    </div>
  );
};

export default Chat;
