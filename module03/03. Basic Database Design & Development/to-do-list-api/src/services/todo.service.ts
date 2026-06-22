import type { TTodoItem } from "../models/todo.model.js";
import todos from "../data/todolist.data.json" with { type: "json" };

const findTodoById = (id: number) => {
	return todos.find((todo: TTodoItem) => todo.id === id);
};

const handleIDGeneration = (): number => {
	const lastTodo: TTodoItem = todos[todos.length - 1];
	return lastTodo ? lastTodo.id + 1 : 1;
};

export { findTodoById, handleIDGeneration };
