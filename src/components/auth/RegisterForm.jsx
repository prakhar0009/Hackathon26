import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    if (!emailRegex.test(form.email)) {
      return toast.error("Invalid email");
    }

    try {
      await registerUser(form);

      toast.success("Account created 🎉");

      // ONLY redirect — no login()
      navigate("/login"); // 👈 common login page
    } catch (err) {
      toast.error(err.message || "Registration failed");
    }
  };

  // Inside RegisterForm.jsx
  const handleRegister = (userData) => {
    // 1. Get existing users or start an empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // 2. Add new user (e.g., { email, password, role: 'buyer' })
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    // 3. Auto-login: Save the current session
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // 4. Redirect to appropriate dashboard
    navigate(
      userData.role === "buyer" ? "/buyer-dashboard" : "/seller-dashboard",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0E6] px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full max-w-lg bg-[#FFFDF8] border border-[rgba(0,0,0,0.06)] shadow-[0_16px_50px_rgba(0,0,0,0.03)] rounded-2xl p-8"
      >
        {/* Heading */}
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
              type="button"
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
              type="button"
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
          type="submit"
          className="w-full bg-[#A35831] hover:bg-[#8B4A29] text-white py-3 rounded-lg transition text-lg"
        >
          Create Account →
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
