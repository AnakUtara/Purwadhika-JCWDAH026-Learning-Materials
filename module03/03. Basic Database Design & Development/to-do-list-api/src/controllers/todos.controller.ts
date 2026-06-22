import type { NextFunction, Request, Response } from "express";
import pg from "../libs/db.js";

// Layer controller hanya akan mengurus logic untuk menerima request, memproses data yang diperlukan, dan mengembalikan response

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

			if (!existingTodo.rows.length) {
				throw new Error(`To-do item dengan id ${todoId} tidak ditemukan`);
			}

			res.send({
				message: `Berhasil mengambil to-do item dengan id ${todoId}`,
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

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const { todoId } = req.params;
			const { title, isDone } = req.body;

			const existingTodo = await pg.query("SELECT * FROM todos WHERE id = $1", [
				todoId,
			]);

			if (!existingTodo.rows.length) {
				throw new Error(`To-do item dengan id ${todoId} tidak ditemukan`);
			}

			// Penting untuk memastikan klausa WHERE harus menggunakan id untuk memastikan hanya 1 data yang diupdate,
			// bukan semua data
			const updatedTodo = await pg.query(
				"UPDATE todos SET title = $1, is_done = $2 WHERE id = $3 RETURNING *",
				[
					(title as string) || existingTodo.rows[0].title,
					Boolean(isDone) || existingTodo.rows[0].is_done,
					todoId,
				],
			);

			res.send({
				message: `Berhasil mengubah to-do item dengan id ${todoId}`,
				data: updatedTodo.rows[0],
			});
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const { todoId } = req.params;

			const existingTodo = await pg.query(
				"SELECT id FROM todos WHERE id = $1",
				[todoId],
			);

			if (!existingTodo.rows.length) {
				throw new Error(`To-do item dengan id ${todoId} tidak ditemukan`);
			}

			// Penting untuk memastikan klausa WHERE harus menggunakan id untuk memastikan hanya 1 data yang dihapus,
			// bukan semua data
			await pg.query("DELETE FROM todos WHERE id = $1", [todoId]);

			res.send({
				message: `Berhasil menghapus to-do item dengan id ${todoId}`,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default TodoController;
