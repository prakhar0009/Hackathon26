import { useState } from "react";
import { registerUser } from "../../api/auth.api";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const handleSubmit = async () => {
    await registerUser(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0E6]">
      <div className="w-full max-w-md bg-[#FFFDF8] border border-[rgba(0,0,0,0.06)] shadow-[0_16px_50px_rgba(0,0,0,0.03)] rounded-2xl p-8">
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
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-[#666666]">Email Address</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm text-[#666666]">Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A35831]"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <label className="text-sm text-[#666666] block mb-2">I am a</label>

          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setForm({ ...form, role: "buyer" })}
              className={`flex-1 py-2 rounded-md ${
                form.role === "buyer"
                  ? "bg-white shadow text-[#A35831]"
                  : "text-gray-500"
              }`}
            >
              Buyer
            </button>

            <button
              onClick={() => setForm({ ...form, role: "seller" })}
              className={`flex-1 py-2 rounded-md ${
                form.role === "seller"
                  ? "bg-white shadow text-[#A35831]"
                  : "text-gray-500"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#A35831] hover:bg-[#8B4A29] text-white py-3 rounded-lg transition"
        >
          Create Account →
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
