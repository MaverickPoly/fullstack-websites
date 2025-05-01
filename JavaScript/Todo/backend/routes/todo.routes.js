import express from "express";
import {createTodo, deleteTodo, getTodo, myTodos, updateTodo} from "../controllers/todo.controller.js";
import {loginRequired} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", loginRequired, createTodo);
router.get("/", loginRequired, myTodos);
router.get("/:todoId", loginRequired, getTodo);
router.put("/:todoId", loginRequired, updateTodo);
router.delete("/:todoId", loginRequired, deleteTodo);

export default router;
