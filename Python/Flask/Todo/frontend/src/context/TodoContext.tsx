import {createContext, ReactNode, useContext, useState} from "react";
import {Todo, TodosContextType} from "../types/TodoTypes.ts";
import {api} from "../util/axios.ts";

const TodosContext = createContext<TodosContextType | undefined>(undefined);


export const TodosProvider = ({children}: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Create Todo
    const createTodo = async (title: string) => {
        try {
            const res = await api.post("/todos", {title});
            setTodos([...todos, res.data.data])
            return {success: true, message: res.data.message};
        } catch (error: any) {
            console.error(error);
            return {success: false, message: error?.response?.data?.message || "Failed to create todo!"}
        }
    }

    // Get Todos
    const getTodos = async () => {
        try {
            const res = await api.get("/todos");

            setTodos(res.data.data);

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Failed to fetch todos!"}
        }
    }

    // Get Todo
    const getTodo = async (todoId: number) => {
        try {
            const res = await api.get(`/todos/${todoId}`);

            return {success: true, message: res.data.message, todo: res.data.todo};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Failed to fetch a todo!"}
        }
    }


    // Update Todo
    const updateTodo = async (todoId: number, title: string, completed: boolean) => {
        try {
            const res = await api.put(`/todos/${todoId}`, {title, completed});

            setTodos(todos.map(todo => todo.id === todoId ? {...todo, title, completed} : todo));

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Failed to update a todo"}
        }
    }

    // Delete todo
    const deleteTodo = async (todoId: number) => {
        try {
            const res = await api.delete(`/todos/${todoId}`);

            setTodos(todos.filter(todo => todo.id !== todoId))

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Failed to delete a todo!"}
        }
    }

    return <TodosContext.Provider value={{todos, createTodo, getTodos, getTodo, updateTodo, deleteTodo}}>
        {children}
    </TodosContext.Provider>
}

export const useTodos = () => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error("useTodos must be within TodosProvider!");
    }
    return context;
}
