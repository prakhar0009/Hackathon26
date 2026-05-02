import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      login(email, password, role);
      toast.success("Welcome back!");
      navigate(role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-12 shadow-2xl border border-white">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="bg-[#A35831] text-white w-8 h-8 flex items-center justify-center rounded-md font-bold">
            N
          </div>
          <span className="text-lg font-semibold">NegotiateAI</span>
        </div>

        <h1 className="text-3xl font-serif font-bold text-center mb-2">
          Welcome back
        </h1>
        <p className="text-center text-gray-500 text-sm mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-600 font-medium block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 font-medium block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Toggle — tells the app which dashboard to open */}
          <div>
            <label className="text-sm text-gray-600 font-medium block mb-2">
              I am signing in as
            </label>
            <div className="flex bg-gray-100 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setRole("buyer")}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  role === "buyer"
                    ? "bg-white text-[#A35831] shadow"
                    : "text-gray-400"
                }`}
              >
                Buyer
              </button>
              <button
                type="button"
                onClick={() => setRole("seller")}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                  role === "seller"
                    ? "bg-white text-[#A35831] shadow"
                    : "text-gray-400"
                }`}
              >
                Seller
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#A35831] text-white py-4 rounded-2xl font-bold hover:bg-[#8B4A29] transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-[#A35831] font-bold hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
