import {useTodos} from "../context/TodoContext.tsx";
import {useEffect} from "react";
import TodoTile from "../components/TodoTile.tsx";
import {PiEmpty} from "react-icons/pi";
import {FaBeerMugEmpty} from "react-icons/fa6";
import {ImStarEmpty} from "react-icons/im";
import {CgBatteryEmpty} from "react-icons/cg";
import {FcEmptyTrash} from "react-icons/fc";

export default function AllTodosPage() {
    const {todos, fetchTodos} = useTodos();

    useEffect(() => {
        const fetch = async () => {
            await fetchTodos();
        }
        fetch();
    }, []);

    return <div className="mt-5">
        <h3 className="mb-6 text-3xl font-semibold">All todos:</h3>

        {
            todos.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {todos.map((todo) => (
                        <TodoTile todo={todo} key={todo._id}/>
                    ))}
                </div>
                : <div className="flex gap-5 items-center justify-center my-10">
                    <PiEmpty size={60} className="text-emerald-600" />
                    <span className="text-3xl text-emerald-700 font-semibold">You do not have todos yet!</span>
                </div>
        }
    </div>
}