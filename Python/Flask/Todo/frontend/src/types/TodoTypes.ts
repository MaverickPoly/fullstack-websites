import {BaseReturnType} from "./AuthTypes.ts";

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    user_id: number;
    created_at: string;
}

export interface GetTodoType {
    success: boolean;
    message: string;
    todo?: Todo;
}


export interface TodosContextType {
    todos: Todo[];
    createTodo: (title: string) => Promise<BaseReturnType>;
    getTodos: () => Promise<BaseReturnType>;
    getTodo: (todoId: number) => Promise<GetTodoType>;
    updateTodo: (todoId: number, title: string, completed: boolean) => Promise<BaseReturnType>;
    deleteTodo: (todoId: number) => Promise<BaseReturnType>;
}