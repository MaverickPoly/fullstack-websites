import Form from "../components/Form.tsx";
import Input from "../components/Input.tsx";
import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/auth.context.tsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, fetchMe } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("All fields are required!");
    }

    const loginRes = await login(formData);
    if (loginRes.success) {
      console.log(loginRes.message);
      alert(loginRes.message);
      const meRes = await fetchMe();
      if (meRes.success) {
        console.log(meRes.message);
        navigate("/");
      } else {
        console.error(meRes.message);
      }
    } else {
      console.error(loginRes.message);
      alert(loginRes.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Form handleSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-4">Login</h2>

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

        <button
          type={"submit"}
          className="mt-4 rounded-lg text-white bg-violet-500 p-2 text-lg cursor-pointer hover:bg-violet-600"
        >
          Login
        </button>

        <span className="">
          Don't have an account?
          <Link
            to="/auth/register"
            className="ml-2 text-blue-600 font-bold hover:underline"
          >
            Register
          </Link>
        </span>
      </Form>
    </div>
  );
}
