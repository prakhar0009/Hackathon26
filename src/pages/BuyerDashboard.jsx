import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const BuyerDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#FFFDF8] border-r border-gray-200 p-6">
        <h1 className="text-xl font-bold mb-8">NegotiateAI</h1>

        <ul className="space-y-4 text-[#666666]">
          <li className="text-[#A35831] font-semibold">Dashboard</li>
          <li>Agents</li>
          <li>Sellers</li>
          <li>Chat</li>
        </ul>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 bg-[#F4F0E6] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Buyer Dashboard</h1>

          <p className="text-[#666666]">{user?.email}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">1</h2>
            <p className="text-gray-500">Active Agents</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">2</h2>
            <p className="text-gray-500">Waiting Responses</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">1</h2>
            <p className="text-gray-500">Completed Deals</p>
          </div>
        </div>

        {/* Activity */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>

          <p className="text-gray-500">No activity yet...</p>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
