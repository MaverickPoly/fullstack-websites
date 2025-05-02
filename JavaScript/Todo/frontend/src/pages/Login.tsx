import React, {useState} from "react";
import Input from "../components/Input.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = useState(
        {username: "", password: ""}
    );
    const {login} = useAuth();
    const navigate = useNavigate();


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            // TODO: Toasts
            alert("All fields are required");
        }

        const {success, message} = await login(formData.username, formData.password);

        // TODO: Toasts
        if (success) {
            alert(message);
            navigate("/profile");
        } else {
            alert(message);
        }

    }

    return <div className="flex min-h-[85vh] h-full w-full items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col bg-stone-800 border border-stone-700 rounded-lg px-4 py-6 max-w-xl w-full gap-3">
            <h2 className="text-3xl text-center mb-6 font-semibold text-transparent bg-gradient-to-b from-red-800 to-red-300 bg-clip-text">Login now.</h2>

            <Input type="text" name="username" placeholder="Username..." value={formData.username}
                   onChange={handleChange}/>
            <Input type="password" name="password" placeholder="Password..." value={formData.password}
                   onChange={handleChange}/>

            <button type="submit" className="p-2 text-neutral-300 bg-orange-500 rounded-md mt-4 text-lg cursor-pointer font-semibold hover:bg-orange-600 duration-100">Login</button>
        </form>
    </div>
}