import {
	Router,
	type NextFunction,
	type Request,
	type Response,
} from "express";
import todos from "../data/todolist.data.json" with { type: "json" };
import type { TTodoItem } from "../models/todo.model.js";
import { findTodoById, handleIDGeneration } from "../services/todo.service.js";
import fs from "node:fs";
import { requestBodyValidation } from "../middlewares/request-body-validation.middleware.js";
import {
	createToDoSchema,
	updateToDoSchema,
} from "../validations/todo.schema.js";
import TodoController from "../controllers/todos.controller.js";

const todoRouter: Router = Router();

const todosFilePath = "./src/data/todolist.data.json";

todoRouter.get("/", TodoController.getAll);
todoRouter.get("/:todoId", TodoController.getById);
todoRouter.post(
	"/",
	requestBodyValidation(createToDoSchema),
	TodoController.create,
);

todoRouter.put(
	"/:id",
	requestBodyValidation(updateToDoSchema),
	(req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const existingTodo = findTodoById(Number(id));

		if (!existingTodo) {
			const error = new Error(`To-do item dengan id ${id} tidak ditemukan`);
			// next error akan diteruskan ke error handling middleware di app.ts
			next(error);
		} else {
			const updatedTodo = { ...existingTodo, ...req.body };

			fs.writeFile(
				todosFilePath,
				JSON.stringify(
					todos.map((todo: TTodoItem) =>
						todo.id === Number(id) ? updatedTodo : todo,
					),
				),
				(err) => {
					if (err) {
						const error = new Error("Gagal mengubah to-do item");
						// next error akan diteruskan ke error handling middleware di app.ts
						next(error);
					} else {
						res.send({
							message: `Berhasil mengubah to-do item dengan id ${id}`,
							data: updatedTodo,
						});
					}
				},
			);
		}
	},
);

todoRouter.delete(
	"/:todoId",
	(req: Request, res: Response, next: NextFunction) => {
		const { todoId } = req.params;
		const existingTodo = findTodoById(Number(todoId));

		if (existingTodo) {
			fs.writeFile(
				todosFilePath,
				JSON.stringify(
					todos.filter((todo: TTodoItem) => todo.id !== Number(todoId)),
				),
				(err) => {
					if (err) {
						const error = new Error("Gagal menghapus to-do item");
						// next error akan diteruskan ke error handling middleware di app.ts
						next(error);
					} else {
						res.send({
							message: `Berhasil menghapus to-do item dengan id ${todoId}`,
						});
					}
				},
			);
		} else {
			const error = new Error(`To-do item dengan id ${todoId} tidak ditemukan`);
			// next error akan diteruskan ke error handling middleware di app.ts
			next(error);
		}
	},
);

export default todoRouter;
