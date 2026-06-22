import type { NextFunction, Request, Response } from "express";
import pg from "../libs/db.js";

class TodoController {
	static async getAll(req: Request, res: Response, next: NextFunction) {
		const { search } = req.query;
		try {
			let todos = await pg.query("SELECT * FROM todos");
			if (search) {
				todos = await pg.query("SELECT * FROM todos WHERE title ILIKE $1", [
					`%${search}%`,
				]);
			}

			res.send({
				message: "Sukses mengambil semua to-do items",
				data: todos.rows,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(req: Request, res: Response, next: NextFunction) {
		const { todoId } = req.params;
		try {
			const existingTodo = await pg.query("SELECT * FROM todos WHERE id = $1", [
				todoId,
			]);

			res.send({
				message: `Endpoint ini akan mengembalikan 1 buah to-do item dengan id ${todoId}`,
				data: existingTodo.rows[0],
			});
		} catch (error) {
			next(error);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const { title, isDone } = req.body;
			const newTodo = await pg.query(
				"INSERT INTO todos (title, is_done) VALUES ($1, $2) RETURNING title, is_done",
				[title as string, Boolean(isDone)],
			);

			res.status(201).send({
				message: "Berhasil menambahkan to-do item baru",
				data: newTodo.rows[0],
			});
		} catch (error) {
			next(error);
		}
	}
}

export default TodoController;
