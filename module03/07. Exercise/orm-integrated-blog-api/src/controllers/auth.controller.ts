import type { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma.client.js";
import type { User } from "../generated/prisma/client.js";

class AuthController {
	static async signUp(req: Request, res: Response, next: NextFunction) {
		try {
			await prisma.user.create({
				data: req.body,
			});

			res.status(201).send({
				message: "User created successfully!",
			});
		} catch (error) {
			next(error);
		}
	}

	static async signIn(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;

			const user: User | null = await prisma.user.findUniqueOrThrow({
				where: { email, AND: { password } },
				omit: { password },
			});

			res.send({
				message: "User signed in successfully!",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async getMe(req: Request, res: Response, next: NextFunction) {
		try {
			const { id } = req.params;

			const user: Omit<User, "password"> | null =
				await prisma.user.findUniqueOrThrow({
					where: { id: Number(id) },
					include: { posts: true },
					omit: { password: true },
				});

			res.send({
				message: "User retrieved successfully!",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;
