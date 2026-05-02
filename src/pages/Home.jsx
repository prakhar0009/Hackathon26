import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#222222]">
      {/* NAVBAR */}
      <div className="flex items-center justify-between px-8 py-4 bg-[#FFFDF8] border-b border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3">
          <div className="bg-[#A35831] text-white w-8 h-8 flex items-center justify-center rounded-md font-bold">
            N
          </div>
          <h1 className="text-lg font-semibold">NegotiateAI</h1>
        </div>

        <div className="flex items-center gap-6 text-[#666666]">
          <span className="cursor-pointer">How It Works</span>
          <span className="cursor-pointer">Features</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login/buyer")}
            className="text-[#222222]"
          >
            Log In
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-[#A35831] hover:bg-[#8B4A29] text-white px-5 py-2 rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-20">
        <p className="text-sm text-[#A35831] bg-[#f1e6df] px-4 py-1 rounded-full mb-6">
          AI-POWERED NEGOTIATIONS
        </p>

        <h1 className="text-5xl font-bold leading-tight max-w-3xl">
          Close Better Deals with{" "}
          <span className="text-[#A35831] underline decoration-[#A35831]">
            Intelligent AI Agents
          </span>
        </h1>

        <p className="text-[#666666] mt-6 max-w-xl">
          Create autonomous negotiation agents that handle the back-and-forth
          with sellers — so you can focus on decisions, not conversations.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/register")}
            className="bg-[#A35831] hover:bg-[#8B4A29] text-white px-6 py-3 rounded-lg"
          >
            Start Negotiating →
          </button>

          <button className="border border-gray-300 px-6 py-3 rounded-lg">
            See How It Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
