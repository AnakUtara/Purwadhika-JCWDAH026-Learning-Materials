import type { NextFunction, Request, Response } from "express";
import postService from "../services/post.service.js";
import { responseBuilder } from "../utils/response-builder.util.js";
import AppError from "../errors/app.error.js";

class PostController {
	async publicList(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			const { search, page, limit, orderBy, sortOrder, ...filters } = req.query;
			const {
				data,
				limit: take,
				page: currentPage,
				total,
				totalPages,
			} = await postService.publicList(
				search as string | undefined,
				filters as Record<string, string | number | boolean> | undefined,
				undefined,
				{ page: Number(page) || 1, limit: Number(limit) || 10 },
			);
			res.send(
				responseBuilder(200, "Posts fetched successfully", data, {
					limit: take,
					currentPage,
					totalItems: total,
					totalPages,
				}),
			);
		} catch (error) {
			next(error);
		}
	}

	async authorList(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			if (!req.user) {
				throw new AppError("User not authenticated", 401);
			}

			const authorId = req.user.id;

			const { search, page, limit, orderBy, sortOrder, ...filters } = req.query;
			const {
				data,
				limit: take,
				page: currentPage,
				total,
				totalPages,
			} = await postService.authorList(
				authorId,
				search as string | undefined,
				filters as Record<string, string | number | boolean> | undefined,
				undefined,
				{ page: Number(page) || 1, limit: Number(limit) || 10 },
			);

			res.send(
				responseBuilder(200, "Author's posts fetched successfully", data, {
					limit: take,
					currentPage,
					totalItems: total,
					totalPages,
				}),
			);
		} catch (error) {
			next(error);
		}
	}

	async show(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const postId = req.params.id as string;
			const post = await postService.details(postId);

			if (!post) {
				throw new AppError("Post not found", 404);
			}

			res.send(responseBuilder(200, "Post details fetched successfully", post));
		} catch (error) {
			next(error);
		}
	}

	async create(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.user) {
				throw new AppError("User not authenticated", 401);
			}

			const authorId = req.user.id;
			const postData = req.body;

			const newPost = await postService.create(authorId, postData);

			res
				.status(201)
				.send(responseBuilder(201, "Post created successfully", newPost));
		} catch (error) {
			next(error);
		}
	}

	async update(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.user) {
				throw new AppError("User not authenticated", 401);
			}

			const postId = req.params.id as string;
			const postData = req.body;

			const updatedPost = await postService.update(postId, postData);

			res.send(responseBuilder(200, "Post updated successfully", updatedPost));
		} catch (error) {
			next(error);
		}
	}

	async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			if (!req.user) {
				throw new AppError("User not authenticated", 401);
			}

			const postId = req.params.id as string;

			await postService.delete(postId);

			res.send(responseBuilder(200, "Post deleted successfully", null));
		} catch (error) {
			next(error);
		}
	}
}

export default new PostController();
