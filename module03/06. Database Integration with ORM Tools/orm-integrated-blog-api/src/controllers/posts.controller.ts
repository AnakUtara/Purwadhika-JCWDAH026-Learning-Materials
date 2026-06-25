import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";

class PostsController {
	static async getAll(
		_req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const posts = await prisma.post.findMany({
				include: {
					author: {
						omit: {
							password: true,
						},
					},
				},
			});
			res.send({
				message: "Posts retrieved successfully!",
				data: posts,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const post = await prisma.post.findFirst({
				where: { id: Number(id) },
				include: {
					author: {
						omit: {
							password: true,
						},
					},
				},
			});

			if (!post) {
				throw new Error(`Post with id ${id} not found`);
			}

			res.send({
				message: "Post retrieved successfully!",
				data: post,
			});
		} catch (error) {
			next(error);
		}
	}

	static async create(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { authorId } = req.body;

			await prisma.post.create({
				data: {
					...req.body,
					authorId: Number(authorId),
				},
			});

			res.status(201).send({
				message: "Post created successfully!",
			});
		} catch (error) {
			next(error);
		}
	}

	static async update(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const updatedPost = await prisma.post.update({
				where: { id: Number(id) },
				data: req.body,
			});

			if (!updatedPost) {
				throw new Error(`Post with id ${id} not found`);
			}

			res.send({
				message: "Post updated successfully!",
				data: updatedPost,
			});
		} catch (error) {
			next(error);
		}
	}

	//Challenge: Implementasi RestoreOrSoftDelete menggunakan prisma

	static async delete(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;

			await prisma.post.delete({
				where: { id: Number(id) },
			});

			res.status(204).send({
				message: "Post deleted successfully!",
			});
		} catch (error) {
			next(error);
		}
	}
}

export default PostsController;
