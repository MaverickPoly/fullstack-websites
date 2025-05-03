import React, {useState} from "react";
import Input from "../components/Input.tsx";
import {useTodos} from "../context/TodoContext.tsx";
import {useNavigate} from "react-router-dom";

export default function CreateTodoPage() {
    const [formData, setFormData] = useState({
        title: "",
    });
    const {createTodo} = useTodos();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const {success, message} = await createTodo(formData.title);

        // TODO: Toast
        if (success) {
            alert(message);
        } else {
            alert(message);
        }

        navigate("/todos");

    }

    return <div className="min-h-[90vh] h-full w-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col max-w-xl w-full px-4 py-6 border bg-stone-800 border-stone-700 rounded-md ">
            <h3 className="text-3xl font-semibold text-center mb-6">Create Todo</h3>

            <Input type="text" name="title" placeholder="Title..." value={formData.title} onChange={handleChange} />

            <button type='submit' className="mt-7 p-2 rounded-md text-lg bg-orange-600 hover:bg-orange-700 cursor-pointer font-semibold">Create</button>
        </form>
    </div>
}