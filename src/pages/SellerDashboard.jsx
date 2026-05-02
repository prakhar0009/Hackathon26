import Sidebar from "../components/layout/Sidebar";
import { useAuth } from "../context/AuthContext";

const SellerDashboard = () => {
  const { user } = useAuth();
  return (
    <div className="flex min-h-screen bg-[#F4F0E6]">
      <Sidebar />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold">Seller Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        {/* Dashboard Content */}
      </div>
    </div>
  );
};

export default SellerDashboard; // Critical: Ensure this line exists
