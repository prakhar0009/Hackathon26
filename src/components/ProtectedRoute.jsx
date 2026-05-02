import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the hook instead

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  // Wait for the localStorage check to finish
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not logged in, send them to the home/login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If logged in but the role doesn't match, send them to their own dashboard
  if (allowedRole && user.role !== allowedRole) {
    return (
      <Navigate
        to={user.role === "buyer" ? "/buyer-dashboard" : "/seller-dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
