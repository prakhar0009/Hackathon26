import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import AgentCard from "../components/dashboard/AgentCard";
import CreateAgentForm from "../components/dashboard/CreateAgentForm";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { MessageSquare, ArrowUpRight, User } from "lucide-react";

const StatCard = ({ label, value, colorClass, icon }) => (
  <div className={`rounded-[2rem] p-8 flex items-center gap-6 ${colorClass}`}>
    <span className="text-4xl">{icon}</span>
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm font-bold uppercase tracking-wider opacity-80">
        {label}
      </p>
    </div>
  </div>
);

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [agents, setAgents] = useState([]);
  const [sellers, setSellers] = useState([]);

  const refreshData = () => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const mine = allAgents.filter((a) => a.buyerEmail === user?.email);
    setAgents(mine);

    // Build sellers list: sellers who have joined any of my agents
    const sellerMap = {};
    mine.forEach((a) => {
      if (a.sellerEmail) {
        if (!sellerMap[a.sellerEmail]) {
          sellerMap[a.sellerEmail] = {
            email: a.sellerEmail,
            name: a.sellerName || a.sellerEmail,
            deals: [],
          };
        }
        sellerMap[a.sellerEmail].deals.push(a);
      }
    });
    setSellers(Object.values(sellerMap));
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 1000);
    return () => clearInterval(interval);
  }, [user, activeTab]);

  // Waiting = agents with a seller joined but status still NEGOTIATING (buyer hasn't replied yet)
  // We count agents where seller has sent at least 1 message and buyer hasn't replied
  const countWaiting = () => {
    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    return agents.filter((a) => {
      const msgs = chats[a.id] || [];
      const hasSellerMsg = msgs.some((m) => m.sender === "seller");
      const hasBuyerReply = msgs.some((m) => m.sender === "buyer");
      return hasSellerMsg && !hasBuyerReply && a.status === "NEGOTIATING";
    }).length;
  };

  const getChatsForTab = () => {
    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    return agents.filter((a) => {
      const msgs = chats[a.id] || [];
      return msgs.length > 0;
    });
  };

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
            {activeTab === "Dashboard"
              ? "Dashboard"
              : activeTab === "Agents"
                ? "Create Agent"
                : activeTab === "Sellers"
                  ? "Interested Sellers"
                  : "Your Chats"}
          </h1>
        </header>

        {/* DASHBOARD */}
        {activeTab === "Dashboard" && (
          <>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <StatCard
                label="Active Agents"
                value={agents.filter((a) => a.status === "NEGOTIATING").length}
                colorClass="bg-blue-50 text-blue-600"
                icon="⚡"
              />
              <StatCard
                label="Waiting for Reply"
                value={countWaiting()}
                colorClass="bg-orange-50 text-orange-600"
                icon="🕒"
              />
              <StatCard
                label="Completed"
                value={agents.filter((a) => a.status === "APPROVED").length}
                colorClass="bg-green-50 text-green-600"
                icon="✅"
              />
            </div>

            <h2 className="text-xl font-bold text-[#2D2621] mb-8">
              Your Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {agents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
              {agents.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border border-dashed border-gray-200 text-gray-400">
                  No agents found. Go to 'Agents' to create one.
                </div>
              )}
            </div>
          </>
        )}

        {/* CREATE AGENT */}
        {activeTab === "Agents" && (
          <div className="flex items-start justify-center pt-4">
            <CreateAgentForm onAgentCreated={() => setActiveTab("Dashboard")} />
          </div>
        )}

        {/* SELLERS TAB */}
        {activeTab === "Sellers" && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#2D2621] mb-6 flex items-center gap-3">
              <User size={20} className="text-[#A35831]" /> Sellers Interested
              in Your Requirements
            </h2>
            {sellers.length === 0 ? (
              <div className="py-24 text-center text-gray-400">
                <p className="font-medium italic">
                  No sellers have joined your negotiations yet.
                </p>
                <p className="text-xs text-gray-300 mt-2">
                  Sellers will appear here when they join your agent's
                  negotiation.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sellers.map((seller) => (
                  <div
                    key={seller.email}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831]/30 transition-all"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {seller.name[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2621]">
                          {seller.name}
                        </p>
                        <p className="text-xs text-gray-400">{seller.email}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">
                          {seller.deals.length} deal
                          {seller.deals.length !== 1 ? "s" : ""} negotiating
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {seller.deals.map((d) => (
                          <p
                            key={d.id}
                            className="text-xs text-gray-500 truncate max-w-[160px]"
                          >
                            {d.title}
                          </p>
                        ))}
                      </div>
                      <button
                        onClick={() => navigate(`/chat/${seller.deals[0].id}`)}
                        className="bg-[#A35831] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#8B4A29] transition-all flex items-center gap-2"
                      >
                        <MessageSquare size={14} /> Chat{" "}
                        <ArrowUpRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHAT TAB */}
        {activeTab === "Chat" && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#2D2621] mb-6 flex items-center gap-3">
              <MessageSquare size={20} className="text-[#A35831]" /> Your
              Negotiations
            </h2>
            {getChatsForTab().length === 0 ? (
              <div className="py-24 text-center text-gray-400">
                <p className="font-medium italic">No active chats yet.</p>
                <p className="text-xs text-gray-300 mt-2">
                  Sellers will start a conversation when they join your agent.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {getChatsForTab().map((agent) => {
                  const chats = JSON.parse(
                    localStorage.getItem("chats") || "{}",
                  );
                  const msgs = chats[agent.id] || [];
                  const lastMsg = msgs[msgs.length - 1];
                  const unread = msgs.filter(
                    (m) => m.sender === "seller",
                  ).length;

                  const statusColor = {
                    NEGOTIATING: "bg-blue-50 text-blue-600",
                    ON_HOLD: "bg-yellow-50 text-yellow-600",
                    APPROVED: "bg-green-50 text-green-600",
                    REJECTED: "bg-red-50 text-red-600",
                  };

                  return (
                    <div
                      key={agent.id}
                      onClick={() => navigate(`/chat/${agent.id}`)}
                      className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831]/40 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {agent.title[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#2D2621]">
                            {agent.title}
                          </p>
                          <p className="text-xs text-gray-400 truncate max-w-xs">
                            {lastMsg?.sender === "seller"
                              ? `${agent.sellerName || "Seller"}: ${lastMsg.text}`
                              : lastMsg?.text || ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-[10px] font-bold px-3 py-1 rounded-full ${statusColor[agent.status] || "bg-gray-50 text-gray-600"}`}
                        >
                          {agent.status}
                        </span>
                        <ArrowUpRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerDashboard;
