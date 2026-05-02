import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Bot,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react"; // Professional icons[cite: 1]

const Sidebar = () => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { name: "Agents", icon: <Bot size={20} />, count: 3 },
    { name: "Sellers", icon: <User size={20} /> },
    { name: "Chat", icon: <MessageSquare size={20} />, count: 1 },
  ];

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

        <nav className="space-y-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
            Main
          </p>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center cursor-pointer group"
            >
              <div
                className={`flex items-center gap-4 ${item.active ? "text-[#A35831]" : "text-gray-500 group-hover:text-[#A35831]"}`}
              >
                <span>{item.icon}</span>
                <span className="font-bold text-sm">{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-[#A35831] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        <button
          onClick={logout}
          className="flex items-center gap-4 text-gray-400 hover:text-red-500 font-bold text-sm transition-colors"
        >
          <LogOut size={20} />
          <span>Log Out</span>
        </button>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
          <div className="w-12 h-12 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#A35831]/20">
            {getInitials(user?.fullName)}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-[#2D2621] truncate">
              {user?.fullName || "Active User"}
            </p>
            <p className="text-[11px] text-gray-400 font-medium capitalize">
              {user?.role} • Acme Corp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
