import mongoose from "mongoose";
import {Todo} from "../models/todo.model.js";

export const createTodo = async (req, res) => {
    const userId = req.userId;
    const {title} = req.body;
    if (!title) {
        return res.status(400).json({message: "All fields are required!"});
    }

    try {
        const todo = Todo({title, userId});
        await todo.save();
        res.status(201).json({message: "Todo created successfully!", data: todo});
    } catch (error) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const myTodos = async (req, res) => {
    const userId = req.userId;

    try {
        const todos = await Todo.find({userId: userId});
        res.json({message: "Fetched todos successfully!", data: todos});
    } catch (error) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const getTodo = async (req, res) => {
    const userId = req.userId;
    const {todoId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(todoId))
    {
        return res.status(400).json({message: "Invalid todo Id!"});
    }

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({message: "Todo not found!"});
        }
        if (todo.userId.toString() !== userId) {
            return res.status(400).json({message: "You do not own this todo!"});
        }
        res.json({message: "Fetched a todo successfully!", data: todo});
    } catch (e) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const updateTodo = async (req, res) => {
    const userId = req.userId;
    const {todoId} = req.params;
    const {title, completed} = req.body;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({message: "Invalid todo Id!"});
    }

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({message: "Todo not found!"});
        }
        if (todo.userId.toString() !== userId) {
            return res.status(400).json({message: "You do not own this todo!"});
        }

        if (title !== undefined) {
            todo.title = title;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }

        await todo.save();
        res.json({message: "Updated todo successfully!", data: todo});
    } catch (error) {
        res.status(500).json({message: "Internal Server error!"});
    }
}

export const deleteTodo = async (req, res) => {
    const userId = req.userId;
    const {todoId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
        return res.status(400).json({message: "Invalid todo Id!"});
    }

    try {
        const todo = await Todo.findById(todoId);
        if (!todo) {
            return res.status(404).json({message: "Todo not found!"});
        }
        if (todo.userId.toString() !== userId) {
            return res.status(400).json({message: "You do not own this todo!"});
        }

        await Todo.findByIdAndDelete(todoId);

        res.json({message: "Deleted todo successfully!", data: todo});
    } catch (error) {
        res.status(500).json({message: "Internal Server error!"});
    }
}