import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  ArrowUpRight,
  Search,
  Bell,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  PauseCircle,
  Tag,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const map = {
    NEGOTIATING: "bg-blue-50 text-blue-600 border-blue-100",
    ON_HOLD: "bg-yellow-50 text-yellow-600 border-yellow-100",
    APPROVED: "bg-green-50 text-green-600 border-green-100",
    REJECTED: "bg-red-50 text-red-600 border-red-100",
    WAITING: "bg-orange-50 text-orange-600 border-orange-100",
  };
  return (
    <span
      className={`text-[10px] font-bold px-3 py-1 rounded-full border ${map[status] || "bg-gray-50 text-gray-600 border-gray-100"}`}
    >
      ● {status}
    </span>
  );
};

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openRequests, setOpenRequests] = useState([]);
  const [myDeals, setMyDeals] = useState([]);

  const refreshData = () => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    // Open market: all NEGOTIATING agents not yet claimed by any seller
    setOpenRequests(
      allAgents.filter(
        (a) =>
          a.status === "NEGOTIATING" &&
          (!a.sellerEmail || a.sellerEmail === user.email),
      ),
    );
    // My deals: agents where I joined
    setMyDeals(allAgents.filter((a) => a.sellerEmail === user.email));
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 1500);
    return () => clearInterval(interval);
  }, [user, activeTab]);

  const handleJoin = (agentId) => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const updated = allAgents.map((a) =>
      a.id === agentId
        ? {
            ...a,
            sellerEmail: user.email,
            sellerName: user.fullName,
            status: "NEGOTIATING",
          }
        : a,
    );
    localStorage.setItem("agents", JSON.stringify(updated));

    // Seed the chat with a seller greeting
    const chats = JSON.parse(localStorage.getItem("chats") || "{}");
    if (!chats[agentId]) {
      chats[agentId] = [
        {
          id: Date.now(),
          sender: "seller",
          sellerEmail: user.email,
          sellerName: user.fullName,
          text: `Hello! I'm ${user.fullName}, interested in your requirement. I'd like to discuss the details. What are your exact specifications?`,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ];
      localStorage.setItem("chats", JSON.stringify(chats));
    }
    navigate(`/chat/${agentId}`);
  };

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
              {activeTab === "Dashboard"
                ? "Seller Terminal"
                : activeTab === "MyDeals"
                  ? "My Deals"
                  : "Chat"}
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-1">
              {activeTab === "Dashboard"
                ? "Browse open negotiation requests"
                : activeTab === "MyDeals"
                  ? "Track deals you've joined"
                  : "Your active conversations"}
            </p>
          </div>
          <div className="flex gap-6 items-center text-gray-400">
            <Search size={20} className="cursor-pointer hover:text-[#A35831]" />
            <Bell size={20} className="cursor-pointer hover:text-[#A35831]" />
            <Settings
              size={20}
              className="cursor-pointer hover:text-[#A35831]"
            />
          </div>
        </header>

        {/* OPEN MARKETPLACE */}
        {activeTab === "Dashboard" && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#2D2621] mb-8 flex items-center gap-3">
              <MessageSquare size={20} className="text-[#A35831]" /> Open
              Negotiation Requests
            </h2>

            {openRequests.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-gray-400 font-medium italic">
                  No open requests right now.
                </p>
                <p className="text-xs text-gray-300 mt-2">
                  Check back when buyers deploy new agents.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {openRequests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831]/30 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-white p-3 rounded-xl shadow-sm text-[#A35831]">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2621]">{req.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {req.domain}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 max-w-xs line-clamp-1">
                          {req.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          Target Budget
                        </p>
                        <p className="font-bold text-[#2D2621]">${req.range}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Base: ${req.basePrice}
                        </p>
                      </div>
                      <button
                        onClick={() => handleJoin(req.id)}
                        className="bg-[#A35831] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#8B4A29] transition-all"
                      >
                        Join Negotiation <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MY DEALS */}
        {activeTab === "MyDeals" && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mb-10">
              {[
                {
                  label: "Active",
                  status: "NEGOTIATING",
                  color: "text-blue-600 bg-blue-50",
                  icon: <MessageSquare size={16} />,
                },
                {
                  label: "On Hold",
                  status: "ON_HOLD",
                  color: "text-yellow-600 bg-yellow-50",
                  icon: <PauseCircle size={16} />,
                },
                {
                  label: "Approved",
                  status: "APPROVED",
                  color: "text-green-600 bg-green-50",
                  icon: <CheckCircle size={16} />,
                },
                {
                  label: "Rejected",
                  status: "REJECTED",
                  color: "text-red-600 bg-red-50",
                  icon: <XCircle size={16} />,
                },
              ].map((s) => (
                <div
                  key={s.status}
                  className={`${s.color} rounded-2xl p-5 flex items-center gap-4`}
                >
                  {s.icon}
                  <div>
                    <p className="text-2xl font-bold">
                      {myDeals.filter((d) => d.status === s.status).length}
                    </p>
                    <p className="text-xs font-bold uppercase">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold text-[#2D2621] mb-6">
              Your Negotiations
            </h2>

            {myDeals.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                No deals yet. Join from the Negotiations tab.
              </div>
            ) : (
              <div className="space-y-4">
                {myDeals.map((deal) => (
                  <div
                    key={deal.id}
                    className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831]/30 transition-all"
                  >
                    <div className="flex items-center gap-6">
                      <div className="bg-white p-3 rounded-xl shadow-sm text-[#A35831]">
                        <Tag size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#2D2621]">{deal.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {deal.domain}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">
                          Target
                        </p>
                        <p className="font-bold text-[#2D2621]">
                          ${deal.range}
                        </p>
                      </div>
                      <StatusBadge status={deal.status} />
                      {(deal.status === "NEGOTIATING" ||
                        deal.status === "ON_HOLD") && (
                        <button
                          onClick={() => navigate(`/chat/${deal.id}`)}
                          className="bg-[#A35831] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#8B4A29] transition-all flex items-center gap-2"
                        >
                          <MessageSquare size={14} /> Open Chat
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHAT TAB — just redirect them */}
        {activeTab === "Chat" && (
          <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-[#2D2621] mb-6 flex items-center gap-3">
              <MessageSquare size={20} className="text-[#A35831]" /> Active
              Conversations
            </h2>
            {myDeals.filter(
              (d) => d.status === "NEGOTIATING" || d.status === "ON_HOLD",
            ).length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                No active chats. Join a negotiation first.
              </div>
            ) : (
              <div className="space-y-4">
                {myDeals
                  .filter(
                    (d) => d.status === "NEGOTIATING" || d.status === "ON_HOLD",
                  )
                  .map((deal) => {
                    const chats = JSON.parse(
                      localStorage.getItem("chats") || "{}",
                    );
                    const msgs = chats[deal.id] || [];
                    const lastMsg = msgs[msgs.length - 1];
                    return (
                      <div
                        key={deal.id}
                        onClick={() => navigate(`/chat/${deal.id}`)}
                        className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831]/40 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {(deal.title || "?")[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#2D2621]">
                              {deal.title}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-xs">
                              {lastMsg ? lastMsg.text : "No messages yet"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <StatusBadge status={deal.status} />
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

export default SellerDashboard;
