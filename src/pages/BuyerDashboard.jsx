import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/ui/StatCard";
import AgentCard from "../components/dashboard/AgentCard";
import CreateAgentForm from "../components/dashboard/CreateAgentForm";
import { useAuth } from "../context/AuthContext";

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [agents, setAgents] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    setAgents(savedAgents.filter((a) => a.buyerEmail === user?.email));
  }, [user, activeTab]); // Refresh when switching back to Dashboard

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
            {activeTab}
          </h1>
        </header>
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
                label="Waiting"
                value={agents.filter((a) => a.status === "WAITING").length}
                colorClass="bg-orange-50 text-orange-600"
                icon="🕒"
              />
              <StatCard
                label="Completed"
                value={agents.filter((a) => a.status === "COMPLETED").length}
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
        {activeTab === "Agents" && (
          <div className="flex items-start justify-center pt-4">
            <CreateAgentForm onAgentCreated={() => setActiveTab("Dashboard")} />
          </div>
        )}
        {/* Placeholders for Sellers and Chat */}
        {activeTab === "Sellers" && (
          <div className="text-gray-500">Sellers list coming soon...</div>
        )}
        {activeTab === "Chat" && (
          <div className="text-gray-500">
            Select an agent card to start chatting.
          </div>
        )}
      </main>
    </div>
  );
};

export default BuyerDashboard;
