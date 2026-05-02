import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/ui/StatCard";
import { useAuth } from "../context/AuthContext";
import { Search, Bell, Settings } from "lucide-react"; // Professional icons

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState([]);

  // Load real data from localStorage on mount
  useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    // Filter agents belonging only to this buyer
    const userAgents = savedAgents.filter((a) => a.buyerEmail === user?.email);
    setAgents(userAgents);
  }, [user]);

  // Dynamic counts based on actual data
  const activeCount = agents.filter((a) => a.status === "NEGOTIATING").length;
  const waitingCount = agents.filter((a) => a.status === "WAITING").length;
  const completedCount = agents.filter((a) => a.status === "COMPLETED").length;

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
            Dashboard
          </h1>
          <div className="flex gap-6 items-center text-gray-400">
            <Search size={20} className="cursor-pointer hover:text-[#A35831]" />
            <Bell size={20} className="cursor-pointer hover:text-[#A35831]" />
            <Settings
              size={20}
              className="cursor-pointer hover:text-[#A35831]"
            />
          </div>
        </header>

        {/* Dynamic Stats */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          <StatCard
            label="Active Agents"
            value={activeCount}
            colorClass="bg-blue-50 text-blue-600"
            icon="⚡"
          />
          <StatCard
            label="Waiting"
            value={waitingCount}
            colorClass="bg-orange-50 text-orange-600"
            icon="🕒"
          />
          <StatCard
            label="Completed"
            value={completedCount}
            colorClass="bg-green-50 text-green-600"
            icon="✅"
          />
        </div>

        {/* Dynamic Recent Activity */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#2D2621] mb-8">
            Recent Activity
          </h2>

          {agents.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-medium italic">
                No recent activity found.
              </p>
              <p className="text-xs text-gray-300 mt-2">
                Create an agent to start negotiating.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {agents.slice(0, 5).map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-bold text-[#2D2621] text-base">
                        New agent created: {agent.title}
                      </p>
                      <p className="text-sm text-gray-400 font-medium">
                        {agent.domain} • {agent.subdomain || "General"}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400 font-medium">
                    {agent.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
