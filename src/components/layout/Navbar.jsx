import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="bg-[#A35831] text-white p-2 rounded-lg font-bold">
          N
        </div>
        <span className="text-xl font-bold font-serif">NegotiateAI</span>
      </div>

      <div className="flex gap-8 items-center">
        <button
          onClick={() => navigate("/login")}
          className="text-[#2D2621] font-bold hover:text-[#A35831] transition-colors"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-[#A35831] text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-[#A35831]/20 hover:bg-[#8e4a28] transition-all"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
