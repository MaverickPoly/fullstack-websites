import { useContext, useState } from "react";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await login(formData.email, formData.password);
    if (success) {
      navigate("/");
      successToast(message);
    } else {
      errorToast(message);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-32 bg-neutral-100 max-w-md w-full rounded-md py-6 px-2 gap-1"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <Input
          name="email"
          type="email"
          placeholder="Your Email..."
          value={formData.email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Your Password..."
          value={formData.password}
          onChange={onChange}
        />

        <button
          type="submit"
          className="cursor-pointer mt-6 w-full bg-yellow-700 hover:bg-yellow-600 rounded-sm p-2 text-white text-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
