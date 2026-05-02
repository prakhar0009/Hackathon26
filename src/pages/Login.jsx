import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F0E6]">
      <div className="bg-white p-8 rounded-xl shadow w-96 text-center">
        <h1 className="text-2xl font-bold mb-6">Login As</h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/login/buyer")}
            className="bg-[#A35831] text-white py-3 rounded"
          >
            Login as Buyer
          </button>

          <button
            onClick={() => navigate("/login/seller")}
            className="border py-3 rounded"
          >
            Login as Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
