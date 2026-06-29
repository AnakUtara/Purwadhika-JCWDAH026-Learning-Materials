import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import type { IBaseControllerSoftDelete } from "../interfaces/base-controller.interface.js";
import type { PostWhereInput } from "../generated/prisma/models.js";

// Berikut format berbeda yang lebih mengikuti paradigma Functional Programming,
// karena kita tidak menggunakan class, melainkan object literal
// yang memiliki method-method yang sesuai dengan interface IBaseControllerSoftDelete
// lebih simpel, karena kita tidak perlu menggunakan keyword class, constructor, this, super, extends, implements, dll
const PostsController: IBaseControllerSoftDelete = {
	async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
		console.log(req.query);
		const { page, limit, ...filters } = req.query;

		// Supaya lebih rapih, biasa memang query parameter itu dibuat ada fallback-nya,
		// misal kalau tidak ada page, maka default-nya adalah 1, kalau tidak ada limit, maka default-nya adalah 10
		// agar lebih aman, karena query parameter itu kan bisa diubah-ubah oleh user,
		//  maka kita harus memastikan bahwa page dan limit itu adalah number,
		// kalau tidak, maka default-nya adalah 1 dan 10

		// pagination bisa dipisahkan ke function tersendiri,
		// misal function getPagination(page: string, limit: string): { pageNum: number, limitNum: number, skipAmount: number }
		// supaya bisa digunakan di controller lain juga, misal di controller tags, users, dll
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
		// cara baca ternary operator di atas adalah kalau filters.orderBy ada,
		// maka cek apakah filters.orderBy itu "asc", kalau iya, maka orderBy = "asc",
		// kalau tidak, maka orderBy = "desc",
		// kalau filters.orderBy tidak ada, maka orderBy = "desc"

		if (filters.search) {
			whereClause.OR = [
				{ title: { contains: String(filters.search), mode: "insensitive" } },
			];
		}

		// Relation filter dengan table lain yang memiliki relasi dengan table post, misalnya table user,
		// maka kita bisa menggunakan relation filter untuk memfilter data post berdasarkan data user
		if (filters.authorId) {
			whereClause.authorId = Number(filters.authorId);
		}

		try {
			// Setiap query yang dijalankan sebagai dua atau lebih query yang berbeda/saling berhubungan,
			// maka gunakan prisma.$transaction untuk menjalankan query-query tersebut dalam satu transaksi
			// prisma.$transaction akan memastikan bahwa semua query dijalankan dalam satu transaksi,
			// sehingga jika salah satu query gagal, maka semua query akan dibatalkan
			// dan tidak ada perubahan yang dilakukan pada database.

			// Jika transaksi yang dilakukan membutuhkan kondisi tertentu,
			// misalnya registrasi user dengan menggunakan referral code
			// akan membuat data di voucher table dan assign id voucher kembali ke table user,
			// maka gunakan prisma.$transaction mode interactive,
			// karena prisma.$transaction mode interactive menggunakan callback function,
			// sehingga kita bisa melakukan query-query antar table yang lebih kompleks dalam satu transaksi.

			// Simple-nya, jika argument yang diberikan ke prisma.$transaction adalah array of query,
			// maka mode-nya adalah sequential.
			// Jika argument yang diberikan ke prisma.$transaction adalah callback function dengan tx sebagai parameter callback,
			// maka mode-nya adalah interactive.

			// Berikut contoh penggunaan prisma.$transaction mode sequential:
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
