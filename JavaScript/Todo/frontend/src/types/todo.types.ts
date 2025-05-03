import {ReturnPayload} from "./auth.types.ts";

export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface TodoReturnPayload {
    success: boolean;
    message: string;
    data: Todo | null;
}


export interface TodosContextPayload {
    todos: Todo[];
    createTodo: (title: string) => Promise<ReturnPayload>;
    fetchTodos: () => Promise<ReturnPayload>;
    getTodo: (id: string) => Promise<TodoReturnPayload>;
    updateTodo: (id: string, title: string, completed: boolean) => Promise<ReturnPayload>;
    deleteTodo: (id: string) => Promise<ReturnPayload>;
}
