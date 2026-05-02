import BuyerLoginForm from "../components/auth/BuyerLoginForm";

const BuyerLogin = () => {
  return (
    <div className="min-h-screen bg-[#F4F0E6] flex flex-col items-center justify-center p-6">
      <div className="mb-8 flex items-center gap-2">
        <div className="bg-[#A35831] text-white p-2 rounded-lg font-bold text-xl">
          N
        </div>
        <span className="text-2xl font-bold font-serif">NegotiateAI</span>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-12 shadow-2xl shadow-black/5">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-[#2D2621] mb-2">
            Welcome back
          </h1>
          <p className="text-gray-400">Sign in to your account to continue</p>
        </div>

        <BuyerLoginForm />

        <p className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-[#A35831] font-bold">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
};

export default BuyerLogin;
