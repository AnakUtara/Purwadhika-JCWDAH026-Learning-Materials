import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import type { IBaseControllerSoftDelete } from "../interfaces/base-controller.interface.js";
import type { PostWhereInput } from "../generated/prisma/models.js";

const PostsController: IBaseControllerSoftDelete = {
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { page, limit, ...filters } = req.query;

		const pageNum = Number(page) || 1;
		const limitNum = Number(limit) || 10;
		const skipAmount = (pageNum - 1) * limitNum;

		const whereClause: PostWhereInput = {
			deletedAt: null,
		};

		// Agar data terbaru muncul di halaman pertama secara default, maka kita bisa menggunakan orderBy
		const orderBy = filters.orderBy
			? String(filters.orderBy) === "asc"
				? "asc"
				: "desc"
			: "desc";

		if (filters.search) {
			whereClause.OR = [
				{ title: { contains: String(filters.search), mode: "insensitive" } },
			];
		}

		// Relation filter dengan table lain yang memiliki relasi dengan table post, misalnya table user,
		// maka kita bisa menggunakan relation filter untuk memfilter data post berdasarkan data user
		if (filters.authorId || req.user?.id) {
			whereClause.authorId = Number(filters.authorId) || req.user?.id;
		}

		try {
			const [posts, totalPosts] = await prisma.$transaction([
				prisma.post.findMany({
					where: whereClause,
					include: {
						author: {
							omit: {
								password: true,
							},
						},
					},
					skip: page ? skipAmount : undefined,
					take: limit ? limitNum : undefined,
					orderBy: {
						id: orderBy,
					},
				}),
				prisma.post.count({
					where: whereClause,
				}),
			]);

			res.send({
				message: "Posts retrieved successfully!",
				data: posts,
				meta: {
					currentPage: page ? pageNum : 0,
					limit: limit ? limitNum : page ? 10 : 0,
					totalPages: Math.ceil(totalPosts / limitNum),
					totalPosts,
				},
			});
		} catch (error) {
			next(error);
		}
	},

	async getById(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;
			const post = await prisma.post.findFirst({
				where: { id: Number(id), deletedAt: null },
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
	},

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.user) {
				throw new Error("User not authenticated");
			}

			await prisma.post.create({
				data: {
					...req.body,
					authorId: req.user.id,
				},
			});

			res.status(201).send({
				message: "Post created successfully!",
			});
		} catch (error) {
			next(error);
		}
	},

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const updatedPost = await prisma.post.update({
				where: { id: Number(id), deletedAt: null },
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
	},

	async restore(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { id } = req.params;

			const restoredPost = await prisma.post.update({
				where: { id: Number(id), deletedAt: { not: null } },
				data: { deletedAt: null },
			});

			res.send({
				message: "Post restored successfully!",
				data: restoredPost,
			});
		} catch (error) {
			next(error);
		}
	},

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { id } = req.params;
			const { hard } = req.query;

			if (hard && String(hard) === "true") {
				await prisma.post.delete({
					where: { id: Number(id) },
				});

				res.send({
					message: "Post permanently deleted successfully!",
				});

				return;
			}

			await prisma.post.update({
				where: { id: Number(id), deletedAt: null },
				data: { deletedAt: new Date() },
			});

			res.send({
				message: "Post soft deleted successfully!",
			});
		} catch (error) {
			next(error);
		}
	},
};

export default PostsController;
