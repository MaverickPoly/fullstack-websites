import React, {useState} from "react";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const {signup} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            return alert("Some fields are missing!");
        }

        if (formData.password !== formData.confirmPassword) {
            return alert("Passwords do not match!");
        }

        const {success, message} = await signup(formData.username, formData.email, formData.password);

        if (success) {
            alert(message);
            navigate("/auth/login");
        } else {
            alert(message);
        }
    }

    return <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <form onSubmit={handleSubmit}
              className="max-w-xl w-full border border-amber-400 mx-auto flex flex-col py-10 px-6 rounded-lg gap-3 bg-amber-200">
            <h2 className="text-4xl font-bold mb-8 text-center">Register now.</h2>

            <Input type="text" name="username" placeholder="username..." onChange={handleChange}/>
            <Input type="email" name="email" placeholder="email..." onChange={handleChange}/>
            <Input type="password" name="password" placeholder="password..." onChange={handleChange}/>
            <Input type="password" name="confirmPassword" placeholder="confirm password..." onChange={handleChange}/>

            <Button text="Signup" type="submit" variant="filled" clasName="mt-6"/>
        </form>
    </div>
}