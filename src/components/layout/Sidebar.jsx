import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  Users,
  MessageSquare,
  LogOut,
  Store,
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({});

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Live counts from localStorage — refreshes every second
  useEffect(() => {
    const refresh = () => {
      const agents = JSON.parse(localStorage.getItem("agents") || "[]");
      if (user?.role === "buyer") {
        const mine = agents.filter((a) => a.buyerEmail === user.email);
        const chats = JSON.parse(localStorage.getItem("chats") || "{}");
        // Sellers section: unique sellers who have sent messages to buyer's agents
        const sellerSet = new Set();
        mine.forEach((a) => {
          const msgs = chats[a.id] || [];
          msgs.forEach((m) => {
            if (m.sender === "seller") sellerSet.add(m.sellerEmail);
          });
        });
        setCounts({
          Sellers: sellerSet.size,
          Chat: mine.filter((a) => {
            const msgs = chats[a.id] || [];
            return msgs.some((m) => m.sender === "seller");
          }).length,
        });
      } else if (user?.role === "seller") {
        const negotiating = agents.filter((a) => a.status === "NEGOTIATING");
        const chats = JSON.parse(localStorage.getItem("chats") || "{}");
        const myActive = agents.filter(
          (a) =>
            a.sellerEmail === user.email &&
            (a.status === "NEGOTIATING" || a.status === "ON_HOLD"),
        );
        setCounts({
          Dashboard: negotiating.length,
          Chat: myActive.length,
        });
      }
    };
    refresh();
    const interval = setInterval(refresh, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const buyerMenu = [
    { id: "Dashboard", name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { id: "Agents", name: "Agents", icon: <Bot size={18} /> },
    { id: "Sellers", name: "Sellers", icon: <Users size={18} /> },
    { id: "Chat", name: "Chat", icon: <MessageSquare size={18} /> },
  ];

  const sellerMenu = [
    {
      id: "Dashboard",
      name: "Negotiations",
      icon: <LayoutDashboard size={18} />,
    },
    { id: "MyDeals", name: "My Deals", icon: <Store size={18} /> },
    { id: "Chat", name: "Chat", icon: <MessageSquare size={18} /> },
  ];

  const menuItems = user?.role === "seller" ? sellerMenu : buyerMenu;

  return (
    <div className="w-72 bg-white h-screen border-r flex flex-col justify-between p-8">
      <div>
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#A35831] text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
            N
          </div>
          <span className="font-bold text-xl text-[#2D2621] font-serif">
            NegotiateAI
          </span>
        </div>

        <nav className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Main
          </p>
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex justify-between items-center cursor-pointer p-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-[#F4F0E6] text-[#A35831]"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span>{item.icon}</span>
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {counts[item.id] > 0 && (
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    activeTab === item.id
                      ? "bg-[#A35831] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {counts[item.id]}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        <button
          onClick={logout}
          className="flex items-center gap-4 text-gray-400 hover:text-red-500 font-bold text-sm"
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <div className="w-12 h-12 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm">
            {getInitials(user?.fullName)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#2D2621] truncate">
              {user?.fullName || user?.email}
            </p>
            <p className="text-[11px] text-gray-400 font-medium capitalize">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
