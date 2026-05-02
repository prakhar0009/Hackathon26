import { useState, useContext } from "react";
import { loginBuyer } from "../../api/auth.api";
import { AuthContext } from "../../context/AuthContext";

const BuyerLoginForm = () => {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const data = await loginBuyer(form);
    login(data);
  };

  return (
    <div className="space-y-4 w-80">
      <input
        placeholder="Buyer Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login as Buyer</button>
    </div>
  );
};

export default BuyerLoginForm;
