import {useTodos} from "../context/TodoContext.tsx";
import {useEffect} from "react";
import Loading from "../components/Loading.tsx";
import TodoCard from "../components/TodoCard.tsx";
import {SiVite} from "react-icons/si";
import {DiReact} from "react-icons/di";


export default function TodosPage() {
    const {todos, getTodos} = useTodos();

    useEffect(() => {
        const fetch = async () => {
            const {success, message} = await getTodos();


            // TODO: Toast
            if (success) {
                // alert(message);
                console.log(message);
            } else {
                // alert(message);
                console.log(message);
                // Return an error page
            }
        }
        fetch();
    }, []);

    if (!todos) {
        return <Loading/>
    }

    return <div className="max-w-5xl w-full mx-auto flex flex-col py-4">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-900 to-orange-500 text-transparent bg-clip-text self-start">All
            Todos</h2>

        {todos.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-3">
                {todos.map((todo) => <TodoCard key={todo.id} todo={todo}/>)}
            </div>
            :
            <div className="flex items-center justify-center flex-col mt-10">
                <div className="flex gap-5">
                    <SiVite size={115}/>
                    <DiReact size={135}
                             className="text-cyan-500 hover:drop-shadow-md duration-300 hover:drop-shadow-cyan-400"/>
                </div>
                <h3 className="mt-6 text-3xl bg-gradient-to-r font-bold from-blue-800 to-cyan-500 text-transparent bg-clip-text">You
                    do not have todos yet!</h3>
            </div>
        }
    </div>
}