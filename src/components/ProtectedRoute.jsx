import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F0E6]">
        <div className="text-[#A35831] font-bold text-lg">Loading...</div>
      </div>
    );
  }

  // Not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role → redirect to their own dashboard
  if (allowedRole && user.role !== allowedRole) {
    return (
      <Navigate
        to={user.role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
