import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the custom hook

const SellerLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Use the hook to access the login function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Explicitly pass "seller" as the requested role
      await login(email, password, "seller");
      navigate("/dashboard/seller"); // Redirect to the seller dashboard[cite: 1]
    } catch (err) {
      // This will catch the "Access Denied" error if a Buyer tries to log in here[cite: 1]
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Seller Sign In</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-[#A35831] focus:border-[#A35831]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-[#A35831] focus:border-[#A35831]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#A35831] text-white p-3 rounded-lg font-bold hover:bg-[#8e4a28] transition-colors"
        >
          Sign In as Seller
        </button>
      </form>
    </div>
  );
};

export default SellerLoginForm;
