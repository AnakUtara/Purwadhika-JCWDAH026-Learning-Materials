import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.js";
import {
	toDoUpdateValidation,
	toDoValidation,
} from "../validations/todo.validation.js";

class TodosController {
	async getAll(req: Request, res: Response, next: NextFunction) {
		const { page, limit, title, completed } = req.query;
		try {
			const todos = await prisma.todo.findMany({
				where: {
					title: title
						? { contains: String(title), mode: "insensitive" }
						: undefined,
					completed: completed ? { equals: completed === "true" } : undefined,
				},
				skip: page && limit ? (Number(page) - 1) * Number(limit) : undefined,
				take: limit ? Number(limit) : undefined,
			});
			res.send({ message: "Todos retrieved successfully", data: todos });
		} catch (error) {
			next(error);
		}
	}

	async getById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			const todo = await prisma.todo.findUnique({
				where: { id: Number(id) },
			});
			if (!todo) {
				return res.status(404).send({ message: "Todo not found" });
			}
			res.send({ message: "Todo retrieved successfully", data: todo });
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction) {
		const { title, completed } = req.body;
		try {
			const validTodo = await toDoValidation.parseAsync({ title, completed });

			const newTodo = await prisma.todo.create({
				data: validTodo,
			});
			res
				.status(201)
				.send({ message: "Todo created successfully", data: newTodo });
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		const { title, completed } = req.body;
		try {
			const validTodo = await toDoUpdateValidation.parseAsync({
				title,
				completed,
			});

			const existingTodo = await prisma.todo.findUnique({
				where: { id: Number(id) },
			});

			if (!existingTodo) {
				return res.status(404).send({ message: "Todo not found" });
			}

			const updatedTodo = await prisma.todo.update({
				where: { id: Number(id) },
				data: validTodo,
			});
			res.send({ message: "Todo updated successfully", data: updatedTodo });
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;
		try {
			await prisma.todo.delete({
				where: { id: Number(id) },
			});
			res.send({ message: "Todo deleted successfully" });
		} catch (error) {
			next(error);
		}
	}
}

export default new TodosController();
