import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/ui/StatCard";
import { useAuth } from "../context/AuthContext";

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar />

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
            Dashboard
          </h1>
          <div className="flex gap-4">
            <button className="p-2 text-gray-400">🔔</button>
            <button className="p-2 text-gray-400">⚙️</button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          <StatCard
            label="Active Agents"
            value="1"
            colorClass="bg-blue-50 text-blue-600"
            icon="⚡"
          />
          <StatCard
            label="Waiting"
            value="2"
            colorClass="bg-orange-50 text-orange-600"
            icon="🕒"
          />
          <StatCard
            label="Completed"
            value="1"
            colorClass="bg-green-50 text-green-600"
            icon="✅"
          />
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#2D2621] mb-8">
            Recent Activity
          </h2>

          <div className="space-y-0">
            {[
              {
                title: "AI started negotiating with SteelWorld",
                sub: "Industrial Steel Procurement",
                time: "2 hours ago",
                color: "bg-blue-500",
              },
              {
                title: "Email opened by CloudHost",
                sub: "Cloud Infrastructure License",
                time: "5 hours ago",
                color: "bg-orange-500",
              },
              {
                title: "Deal completed with TransLink",
                sub: "Logistics Fleet Contract — $82,500",
                time: "1 day ago",
                color: "bg-green-500",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-6 border-b border-gray-50 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <div>
                    <p className="font-bold text-[#2D2621]">{item.title}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
