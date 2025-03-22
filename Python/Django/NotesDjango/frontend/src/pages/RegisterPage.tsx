import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // TODO: Toast
      return alert("Passwords do not match!");
    }

    const {success, message} = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    // TODO: Toasts
    if (success) {
      alert(message);
      navigate("/login");
    } else {
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col p-4 border border-neutral-600 max-w-lg w-full mt-24 shadow-xl shadow-neutral-800 gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-10 text-center mt-3">
          Create account
        </h2>

        <Input
          name="username"
          type="text"
          placeholder="Username..."
          value={formData.username}
          onChange={onChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email..."
          value={formData.email}
          onChange={onChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password..."
          value={formData.password}
          onChange={onChange}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
          value={formData.confirmPassword}
          onChange={onChange}
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 text-lg text-center cursor-pointer mt-4 mb-3"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
