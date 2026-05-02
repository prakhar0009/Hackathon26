import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ChatPage from "./pages/Chat"; // Ensure your file is named Chat.jsx
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      {/* Global toast notifications for auth and deal updates */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Buyer Routes */}
        <Route
          path="/dashboard/buyer"
          element={
            <ProtectedRoute allowedRole="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Seller Routes[cite: 1, 2] */}
        <Route
          path="/dashboard/seller"
          element={
            <ProtectedRoute allowedRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Unified Chat Route[cite: 1, 2] */}
        {/* We REMOVE the allowedRole constraint or set it to allow both roles 
            so both Avi and Prakhar can access the shared conversation */}
        <Route
          path="/chat/:agentId"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all Redirect to Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
