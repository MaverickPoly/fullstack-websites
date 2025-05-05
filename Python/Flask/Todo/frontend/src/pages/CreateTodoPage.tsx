import React, {useState} from "react";
import Button from "../components/Button.tsx";
import Input from "../components/Input.tsx";
import {useTodos} from "../context/TodoContext.tsx";
import {useNavigate} from "react-router-dom";

export default function CreateTodoPage() {
    const [title, setTitle] = useState("");
    const {createTodo} = useTodos();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Alert
        if (!title) {
            alert("Title is missing!");
            return;
        }

        const {success, message} = await createTodo(title);
        // TODO: Toast
        if (success) {
            alert(message);
            navigate("/todos")
        } else {
            alert(message);
        }
    }

    return <div className="flex min-h-[90vh] items-center justify-center">
        <form onSubmit={handleSubmit}
              className="max-w-xl w-full mx-4 flex flex-col px-5 py-8 gap-3 bg-amber-200 border border-amber-500 rounded-lg">
            <h2 className="text-4xl font-semibold mb-8 text-center">Create new Todo</h2>

            <Input type="text" name="title" placeholder="Todo title..." onChange={handleChange}/>

            <Button text="Create" type="submit" variant="filled" clasName="mt-7"/>
        </form>
    </div>
}