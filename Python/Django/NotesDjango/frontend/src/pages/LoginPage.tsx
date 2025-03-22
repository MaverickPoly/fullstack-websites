import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { success, message } = await login({ ...formData });

    // TODO: Toasts here:
    if (success) {
      alert(message);
      navigate("/");
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col p-4 border border-neutral-600 max-w-lg w-full mt-32 shadow-xl shadow-neutral-800 gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-10 text-center mt-3">Login</h2>

        <Input
          name="username"
          type="text"
          placeholder="Username..."
          value={formData.username}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password..."
          value={formData.password}
          onChange={onChange}
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 text-lg text-center cursor-pointer mt-4 mb-3"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
