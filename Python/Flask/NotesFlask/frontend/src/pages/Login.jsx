import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return alert("All fields are required!");
    }
    const { success } = await login(formData.email, formData.password);
    if (success) {
      setFormData({ email: "", password: "" });
      navigate("/");
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <form
        onSubmit={handleLogin}
        className="flex flex-col p-5 rounded-md shadow-md gap-3 max-w-xl w-full mx-3 mt-24 bg-stone-900"
      >
        <h3 className="text-3xl font-bold mb-8 text-center">Login</h3>
        <Input
          name="email"
          type="email"
          placeholder="Email Address..."
          value={formData.email}
          onChange={onChange}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password..."
          value={formData.password}
          onChange={onChange}
          required
        />
        <button
          className="w-full text-lg mt-6 bg-zinc-800 hover:bg-zinc-700 rounded-md py-2 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
