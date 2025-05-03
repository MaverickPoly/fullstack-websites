import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import Input from "../components/Input.tsx";

export default function RegisterPage() {
    const [formData, setFormData] = useState(
        {username: "", email: "", password: "", confirmPassword: ""}
    );
    const {register} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            // TODO: Show Toast
            return alert("Passwords do not match!");
        }

        const {success, message} = await register(formData.username, formData.email, formData.password);

        if(success) {
            alert(message);
            navigate("/auth/login");
        } else {
            alert(message);
        }
    }

    return <div className="flex min-h-[85vh] h-full w-full items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col bg-stone-800 border border-stone-700 rounded-lg px-4 py-6 max-w-xl w-full gap-6 mx-4">
            <h2 className="text-3xl text-center font-semibold mb-6 text-transparent bg-gradient-to-r from-blue-900 to-teal-300 bg-clip-text">Create account</h2>

            <Input type="text" name="username" placeholder="Username..." value={formData.username} onChange={handleChange} />
            <Input type="email" name="email" placeholder="Email..." value={formData.email} onChange={handleChange} />
            <Input type="password" name="password" placeholder="Password..." value={formData.password} onChange={handleChange} />
            <Input type="password" name="confirmPassword" placeholder="Confirm Password..." value={formData.confirmPassword} onChange={handleChange} />

            <button className="p-2 font-semibold text-lg bg-amber-700 hover:bg-amber-800 cursor-pointer rounded-lg mt-4">Register</button>
        </form>
    </div>
}
