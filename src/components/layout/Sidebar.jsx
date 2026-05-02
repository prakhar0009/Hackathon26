import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();

  // Define menu items based on the user's role
  const menuItems =
    user?.role === "buyer"
      ? [
          { name: "Dashboard", icon: "🏠", path: "/buyer-dashboard" },
          { name: "Agents", icon: "🤖", count: 3 },
          { name: "Sellers", icon: "👥" },
          { name: "Chat", icon: "💬", count: 1 },
        ]
      : [
          { name: "Dashboard", icon: "🏠", path: "/seller-dashboard" },
          { name: "Products", icon: "📦" },
          { name: "Requests", icon: "📩" },
          { name: "Messages", icon: "💬" },
        ];

  return (
    <div className="w-64 bg-white h-screen border-r flex flex-col justify-between p-6">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-[#A35831] text-white p-2 rounded text-xl font-bold">
            N
          </div>
          <span className="font-bold text-xl text-[#2D2621]">NegotiateAI</span>
        </div>

        <nav className="space-y-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Main
          </p>
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex justify-between items-center group cursor-pointer"
            >
              <div className="flex items-center gap-3 text-gray-600 group-hover:text-[#A35831]">
                <span>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
              {item.count && (
                <span className="bg-[#A35831] text-white text-[10px] px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t pt-6">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 mb-8"
        >
          🚪 <span>Log Out</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#A35831] rounded-full flex items-center justify-center text-white font-bold text-sm">
            {user?.email?.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-[#2D2621] truncate w-32">
              {user?.email}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role} • Acme Corp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
