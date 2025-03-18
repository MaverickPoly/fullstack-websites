import React, { useContext, useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const { warnToast, successToast, errorToast } = useToast();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      return warnToast("Passwords do not match!");
    }

    const { success, message, user } = await register(
      formData.username,
      formData.email,
      formData.password
    );

    if (success) {
      successToast(message);
      navigate("/login");
    } else {
      errorToast(message);
    }
  };

  return (
    <div className="flex w-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-20 bg-neutral-100 max-w-md w-full rounded-md py-6 px-2 gap-1"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <Input
          name="username"
          type="text"
          placeholder="Your Username..."
          value={formData.username}
          onChange={onChange}
        />
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
          value={formData.confirmPassword}
          onChange={onChange}
        />

        <button
          type="submit"
          className="cursor-pointer mt-6 w-full bg-yellow-700 hover:bg-yellow-600 rounded-sm p-2 text-white text-lg"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
