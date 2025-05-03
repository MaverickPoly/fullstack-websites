import {Todo} from "../types/todo.types.ts";
import {useTodos} from "../context/TodoContext.tsx";
import {BiTrash} from "react-icons/bi";

export default function TodoTile({todo}: { todo: Todo }) {
    const {deleteTodo, updateTodo} = useTodos();

    const handleDelete = async (e: MouseEvent) => {
        e.stopPropagation();

        const {success, message} = await deleteTodo(todo._id);

        // TODO: Toast
        if (success) {
            alert(message);
        } else {
            alert(message);
        }
    }

    const toggleComplete = async () => {
        const {success, message} = await updateTodo(todo._id, todo.title, !todo.completed);

        // TODO: Toast
        if (success) {
            alert(message);
        } else {
            alert(message);
        }
    }

    return <div className={`border bg-stone-800 rounded-lg p-3 cursor-pointer ${todo.completed ? "border-green-600" : "border-red-600"}`} onClick={toggleComplete}>
        <div className="flex items-center justify-between mb-1">
            <h4 className="text-xl">{todo.title}</h4>

            <button onClick={handleDelete} className="text-red-700 p-1 hover:bg-stone-700 rounded-md cursor-pointer">
                <BiTrash size={20}/>
            </button>
        </div>
        <div>
            <span className="text-sm">{todo.createdAt.split("T")[0]}</span>
        </div>
    </div>
}
