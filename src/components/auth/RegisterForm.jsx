import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import our custom hook
import toast from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // Access the register function

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    // 1. Ensure preventDefault is called correctly
    if (e) e.preventDefault();

    // 2. Simple Validation
    if (!form.name || !form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      // 3. Pass the data from the 'form' state to our register function[cite: 1]
      // register(email, password, role, fullName)
      register(form.email, form.password, form.role, form.name);

      toast.success("Account created successfully!");

      // 4. Redirect to the correct protected dashboard route[cite: 1]
      navigate(
        form.role === "buyer" ? "/dashboard/buyer" : "/dashboard/seller",
      );
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0E6] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#FFFDF8] border border-[rgba(0,0,0,0.06)] shadow-[0_16px_50px_rgba(0,0,0,0.03)] rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-[#222222] text-center mb-2">
          Create an account
        </h1>
        <p className="text-center text-[#666666] mb-6">
          Start automating your negotiations today
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-sm text-[#666666]">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-[#666666]">Email Address</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-[#666666]">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <label className="text-sm text-[#666666] block mb-2">I am a</label>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "buyer" })}
              className={`flex-1 py-2 rounded-md transition-all ${
                form.role === "buyer"
                  ? "bg-white shadow text-[#A35831] font-bold"
                  : "text-gray-500"
              }`}
            >
              Buyer
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, role: "seller" })}
              className={`flex-1 py-2 rounded-md transition-all ${
                form.role === "seller"
                  ? "bg-white shadow text-[#A35831] font-bold"
                  : "text-gray-500"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#A35831] hover:bg-[#8B4A29] text-white py-3 rounded-lg transition text-lg font-bold"
        >
          Create Account →
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
