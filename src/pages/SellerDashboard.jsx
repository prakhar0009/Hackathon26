import { useState, useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SellerDashboard = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  // Seller sidebar only has one tab for now
  const [activeTab, setActiveTab] = useState("Dashboard");

  useEffect(() => {
    const allAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    setRequests(allAgents.filter((a) => a.status === "NEGOTIATING"));
  }, []);

  return (
    <div className="flex h-screen bg-[#F4F0E6] overflow-hidden">
      {/* Fixed: must pass activeTab and setActiveTab */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-serif font-bold text-[#2D2621]">
            Seller Terminal
          </h1>
          <p className="text-gray-400 mt-2">
            Manage incoming AI negotiation requests
          </p>
        </header>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#2D2621] mb-8">
            Active Negotiations
          </h2>

          {requests.length === 0 ? (
            <div className="py-20 text-center text-gray-400 italic">
              No active negotiation requests at the moment.
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#A35831] transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="bg-white p-3 rounded-xl shadow-sm text-[#A35831]">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D2621]">{req.title}</p>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        {req.domain}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Buyer Target
                      </p>
                      <p className="font-bold text-[#2D2621]">${req.range}</p>
                    </div>
                    <button className="bg-[#A35831] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-[#8B4A29] hover:shadow-lg transition-all">
                      Join Negotiation <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
