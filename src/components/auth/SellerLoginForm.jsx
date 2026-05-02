import { useState, useContext } from "react";
import { loginSeller } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";

const SellerLoginForm = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const data = await loginSeller(form);
    login(data);
  };

  return (
    <div className="space-y-4 w-80">
      <input
        placeholder="Seller Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login as Seller</button>
    </div>
  );
};

export default SellerLoginForm;
