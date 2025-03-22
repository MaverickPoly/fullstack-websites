import React, { useState, useContext } from "react";
import Input from "../components/Input";
import axiosInstance from "../util/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return alert("All fields are required!");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const response = await axiosInstance.post("/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      console.log("Registered!");
      if (response.status === 201) {
        await login(formData.email, formData.password);
        alert("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data.message || "Registration failed!");
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <form
        onSubmit={handleRegister}
        className="flex flex-col p-5 rounded-md shadow-md gap-3 max-w-xl w-full mx-3 mt-16 bg-stone-900"
      >
        <h3 className="text-3xl font-bold mb-8 text-center">Create Account</h3>
        <Input
          name="email"
          type="email"
          placeholder="Email Address..."
          value={formData.email}
          onChange={onChange}
          required
        />
        <Input
          name="username"
          type="text"
          placeholder="Username..."
          value={formData.username}
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password..."
          value={formData.confirmPassword}
          onChange={onChange}
          required
        />
        <button
          className="w-full text-lg mt-6 bg-zinc-800 hover:bg-zinc-700 rounded-md py-2 cursor-pointer"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default Register;
