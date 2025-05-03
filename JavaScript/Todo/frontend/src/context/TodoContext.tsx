import {createContext, ReactNode, useContext, useState} from "react";
import {Todo, TodosContextPayload} from "../types/todo.types.ts";
import {api} from "../lib/axios.ts";

const TodosContext = createContext<TodosContextPayload | undefined>(undefined);

export const TodosProvider = ({children}: { children: ReactNode }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const createTodo = async (title: string) => {
        try {
            const res = await api.post("/todos", {
                title,
            });

            setTodos([...todos, res.data.data]);

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Error creating new todo!"}
        }
    }

    const fetchTodos = async () => {
        try {
            const res = await api.get("/todos");

            setTodos(res.data.data);

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Error fetching todos!"};
        }
    }

    const getTodo = async (id: string) => {
        try {
            const res = await api.get(`/todos/${id}`);

            return {success: true, message: res.data.message, data: res.data.data};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Error fetching a todo!", data: null};
        }
    }

    const updateTodo = async (id: string, title: string, completed: boolean) => {
        try {
            const res = await api.put(`/todos/${id}`, {title, completed});

            setTodos(todos.map(
                (todo) => todo._id === id
                    ? {...todo, title: title, completed: completed}
                    : todo)
            )

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Error updating a todo!"}
        }
    }

    const deleteTodo = async (id: string) => {
        try {
            const res = await api.delete(`/todos/${id}`);

            setTodos(todos.filter((todo) => todo._id !== id));

            return {success: true, message: res.data.message};
        } catch (error: any) {
            return {success: false, message: error?.response?.data?.message || "Error deleting a todo!"}
        }
    }

    return <TodosContext.Provider value={{todos, createTodo, fetchTodos, getTodo, updateTodo, deleteTodo}}>
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
