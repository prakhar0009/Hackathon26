import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SellerDashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#FFFDF8] border-r border-gray-200 p-6">
        <h1 className="text-xl font-bold mb-8">NegotiateAI</h1>

        <ul className="space-y-4 text-[#666666]">
          <li className="text-[#A35831] font-semibold">Dashboard</li>
          <li>Products</li>
          <li>Requests</li>
          <li>Messages</li>
        </ul>

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
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>

          <p className="text-[#666666]">{user?.email}</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">5</h2>
            <p className="text-gray-500">Active Listings</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">3</h2>
            <p className="text-gray-500">Pending Requests</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold">10</h2>
            <p className="text-gray-500">Messages</p>
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

export default SellerDashboard;
