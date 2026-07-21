import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import redisCacheService from "../services/redis-cache.service.js";
import type { Post } from "../generated/prisma/client.js";
import logger from "../utils/logger.js";

class PostController {
	private getCacheKey = (id: string = "all", ...option: string[]): string => {
		return `posts:${id}${option.length > 0 ? `:${option.join(":")}` : ""}`;
	};

	getAll = async (_req: Request, res: Response, next: NextFunction) => {
		const cachedPosts = await redisCacheService.get(this.getCacheKey());

		let posts: Post[] | null = cachedPosts
			? (JSON.parse(cachedPosts) as Post[])
			: null;

		if (!posts) {
			posts = await prisma.post.findMany();
			await redisCacheService.set(this.getCacheKey(), posts, 120);

			logger.info("Fetched posts from database and cached them", {
				cacheKey: this.getCacheKey(),
				numberOfPosts: posts.length,
			});

			return res.send({
				message: "Posts retrieved successfully",
				data: posts,
			});
		}

		logger.info("Retrieved posts from cache", {
			cacheKey: this.getCacheKey(),
			numberOfPosts: posts.length,
		});

		res.send({
			message: "Cached posts retrieved successfully",
			data: posts,
		});
	};

	getById = async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		const cachedPost = await redisCacheService.get(
			this.getCacheKey(id as string),
		);

		let post = cachedPost ? (JSON.parse(cachedPost) as Post) : null;

		if (!post) {
			post = await prisma.post.findUnique({
				where: { id: String(id) },
			});

			console.log("Fetched post from database:", post);

			await redisCacheService.set(this.getCacheKey(id as string), post, 120);

			return res.send({
				message: "Post retrieved successfully",
				data: post,
			});
		}

		res.send({
			message: "Cached post retrieved successfully",
			data: post,
		});
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		const { title, content } = req.body;

		const newPost = await prisma.post.create({
			data: {
				title,
				content,
				author: {
					connect: { id: 1 },
				},
			},
		});

		await redisCacheService.delete(this.getCacheKey()); // Invalidate the cache for all posts
	};
}

export default new PostController();
