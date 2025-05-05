import React, {FormEvent, useState} from "react";
import Input from "../components/Input.tsx";
import Button from "../components/Button.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            // TODO: Toast
            alert("Some fields are missing!");
            return;
        }

        const {success, message} = await login(formData.username, formData.password);

        if (success) {
            // TODO: Toast
            alert(message);
            navigate("/profile");
        } else {
            // TODO: Toast
            alert(message);
        }
    }

    return <div className="min-h-[90vh] flex items-center justify-center">
        <form onSubmit={handleSubmit}
              className="flex flex-col max-w-xl w-full bg-amber-200 border border-orange-400 px-5 py-7 rounded-md gap-3">
            <h2 className="text-center text-4xl mb-8 font-bold">Login now.</h2>

            <Input type="text" name="username" placeholder="username..." onChange={handleChange}/>
            <Input type="password" name="password" placeholder="password..." onChange={handleChange}/>

            <Button text="Login" type="submit" variant="filled" clasName="mt-7"/>
        </form>
    </div>
}