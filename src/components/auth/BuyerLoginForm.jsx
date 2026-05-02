import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Use the hook

const BuyerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access login from hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Must pass "buyer" to match the AuthContext logic[cite: 1]
      await login(email, password, "buyer");
      navigate("/dashboard/buyer");
    } catch (err) {
      alert(err.message); // This will tell you if it's a "Role Mismatch" or "Invalid Credentials"[cite: 1]
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Buyer Email"
        required
        className="w-full p-3 border rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full p-3 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-[#A35831] text-white p-3 rounded"
      >
        Login as Buyer
      </button>
    </form>
  );
};

export default BuyerLoginForm;
