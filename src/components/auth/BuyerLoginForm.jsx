import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginBuyer } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock } from "react-icons/fa";

const BuyerLoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      return toast.error("All fields required");
    }

    try {
      const user = await loginBuyer(form);

      login(user); // store session
      navigate("/dashboard/buyer");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="min-h-screen bg-[#F4F0E6] flex flex-col items-center">
      {/* Logo */}
      <div className="mt-12 flex items-center gap-3">
        <div className="bg-[#A35831] text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
          NegotiateAI
        </div>
        <h1 className="text-xl font-semibold text-[#222222]">NegotiateAI</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <h1 className="text-4xl font-bold text-[#222222] mt-10">
          Welcome back
        </h1>

        <p className="text-[#666666] mt-2 mb-8">
          Sign in to your buyer account
        </p>

        {/* Card */}
        <div className="w-full max-w-lg bg-[#FFFDF8] border border-[rgba(0,0,0,0.06)] shadow-[0_16px_50px_rgba(0,0,0,0.03)] rounded-2xl p-8">
          {/* Email */}
          <div className="mb-5 relative">
            <FaEnvelope className="absolute left-3 top-4 text-gray-400" />
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#A35831] hover:bg-[#8B4A29] text-white py-3 rounded-lg text-lg"
          >
            Sign In →
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#666666] mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#A35831] cursor-pointer"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default BuyerLoginForm;
