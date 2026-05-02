import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ChatPage from "./pages/Chat";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard/buyer"
          element={
            <ProtectedRoute allowedRole="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/seller"
          element={
            <ProtectedRoute allowedRole="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:agentId"
          element={
            <ProtectedRoute allowedRole="buyer">
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
