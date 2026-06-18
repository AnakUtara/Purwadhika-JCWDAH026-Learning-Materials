import express from "express";
import type { Application, Request, Response } from "express";
import todos from "./todolist.data.json" with { type: "json" };
import fs from "node:fs";

type TTodoItem = {
	id: number;
	title: string;
	isDone: string;
};

const todosFilePath = "./todolist.data.json";

const PORT: number = 8000;

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const findTodoById = (id: number) => {
	return todos.find((todo: TTodoItem) => todo.id === id);
};

const handleIDGeneration = (): number => {
	const lastTodo: TTodoItem = todos[todos.length - 1];
	return lastTodo ? lastTodo.id + 1 : 1;
};

app.get("/", (_req: Request, res: Response) => {
	res.send({ message: "Welcome to the To-Do List API!" });
});

app.get("/todos", (_req: Request, res: Response) => {
	res.send({
		message: "Sukses mengambil semua to-do items",
		data: todos,
	});
});

app.get("/todos/:todoId", (req: Request, res: Response) => {
	const { todoId } = req.params;
	const existingTodo = findTodoById(Number(todoId));
	if (existingTodo) {
		res.send({
			message: `Endpoint ini akan mengembalikan 1 buah to-do item dengan id ${todoId}`,
			data: existingTodo,
		});
	} else {
		res.status(404).send({
			message: `To-do item dengan id ${todoId} tidak ditemukan`,
		});
	}
});

app.post("/todos", (req: Request, res: Response) => {
	const newTodo = {
		id: handleIDGeneration(),
		...req.body,
	};

	fs.writeFile(todosFilePath, JSON.stringify([...todos, newTodo]), (err) => {
		if (err) {
			res.status(500).send({
				message: "Gagal menambahkan to-do item baru",
				error: err.message,
			});
		}
	});

	res.status(201).send({
		message: "Berhasil menambahkan to-do item baru",
		data: newTodo,
	});
});

app.put("/todos/:todoId", (req: Request, res: Response) => {
	const { todoId } = req.params;
	const existingTodo = findTodoById(Number(todoId));

	if (!existingTodo) {
		res.status(404).send({
			message: `To-do item dengan id ${todoId} tidak ditemukan`,
		});
	} else {
		const updatedTodo = { ...existingTodo, ...req.body };

		fs.writeFile(
			todosFilePath,
			JSON.stringify(
				todos.map((todo: TTodoItem) =>
					todo.id === Number(todoId) ? updatedTodo : todo,
				),
			),
			(err) => {
				if (err) {
					res.status(500).send({
						message: "Gagal mengubah to-do item",
						error: err.message,
					});
				}
			},
		);

		res.send({
			message: `Berhasil mengubah to-do item dengan id ${todoId}`,
			data: updatedTodo,
		});
	}
});

app.delete("/todos/:todoId", (req: Request, res: Response) => {
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
					res.status(500).send({
						message: "Gagal menghapus to-do item",
						error: err.message,
					});
				} else {
					res.send({
						message: `Berhasil menghapus to-do item dengan id ${todoId}`,
					});
				}
			},
		);
	} else {
		res.status(404).send({
			message: `To-do item dengan id ${todoId} tidak ditemukan`,
		});
	}
});

app.listen(PORT, () => {
	console.log(`Backend server is running on http://localhost:${PORT}`);
});
