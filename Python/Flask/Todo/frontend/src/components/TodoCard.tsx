import {Todo} from "../types/TodoTypes.ts";
import {FiDelete, FiX} from "react-icons/fi";
import {BiCheck} from "react-icons/bi";
import {useTodos} from "../context/TodoContext.tsx";

interface TodoCardProps {
    todo: Todo
}

export default function TodoCard({todo}: TodoCardProps) {
    const {deleteTodo, updateTodo} = useTodos();

    const handleDelete = async () => {
        const {success, message} = await deleteTodo(todo.id);

        if (success) {
            // alert(message);
            console.log(message);
        } else {
            // alert(message);
            console.log(message);
        }
    }

    const toggleComplete = async () => {
        const {success, message} = await updateTodo(todo.id, todo.title, !todo.completed);

        if (success) {
            // alert(message);
            console.log(message);
        } else {
            // alert(message);
            console.log(message);
        }
    }

    return <div
        className={`py-4 relative px-6 bg-amber-200 border ${todo.completed ? "border-green-600 bg-green-200" : "border-red-600 bg-red-200"} rounded-xl`}>
        <h4 className="text-2xl font-semibold text-amber-900 mb-2">{todo.title}</h4>
        <span className="text-neutral-800">{todo.created_at.split(" ").slice(0, 4).join(" ")}</span>

        <div className="absolute top-0 right-0 p-2 flex flex-col gap-1">
            <button className="p-2 cursor-pointer hover:bg-red-400 rounded-lg bg-amber-100" onClick={handleDelete}>
                <FiDelete size={21}/>
            </button>
            <button className="p-2 cursor-pointer hover:bg-orange-300 rounded-lg bg-amber-100" onClick={toggleComplete}>
                {!todo.completed ?
                    <BiCheck size={21}/> : <FiX size={20}/>}
            </button>
        </div>
    </div>;
}