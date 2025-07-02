import Form from "../components/Form.tsx";
import Input from "../components/Input.tsx";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth.context.tsx";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
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
      return alert("Passwords don't match");
    }

    const { success, message } = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      console.log(message);
      alert(message);
      navigate("/auth/login");
    } else {
      console.error(message);
      alert(message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form handleSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-4">Create account</h2>

        <Input
          type="text"
          name="username"
          className=""
          value={formData.username}
          placeholder="Username..."
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <Input
          type="email"
          name="email"
          className=""
          value={formData.email}
          placeholder="Email..."
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <Input
          type="password"
          name="password"
          className=""
          value={formData.password}
          placeholder="Password..."
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <Input
          type="password"
          name="confirmPassword"
          className=""
          value={formData.confirmPassword}
          placeholder="Confirm Password..."
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <button
          type={"submit"}
          className="mt-4 rounded-lg text-white bg-violet-500 p-2 text-lg cursor-pointer hover:bg-violet-600"
        >
          Register
        </button>

        <span className="">
          Already have an account?
          <Link
            to="/auth/login"
            className="ml-2 text-blue-600 font-bold hover:underline"
          >
            Login
          </Link>
        </span>
      </Form>
    </div>
  );
}
