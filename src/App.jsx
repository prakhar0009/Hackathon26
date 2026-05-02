import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BuyerLogin from "./pages/BuyerDashboard";
import SellerLogin from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Home />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Login Selection Page */}
        <Route path="/login" element={<Login />} />

        {/* Role-Based Login */}
        <Route path="/login/buyer" element={<BuyerLogin />} />
        <Route path="/login/seller" element={<SellerLogin />} />

        {/* Protected Dashboards */}
        <Route
          path="/dashboard/buyer"
          element={
            <ProtectedRoute role="buyer">
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/seller"
          element={
            <ProtectedRoute role="seller">
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
