import type { Request, Response, NextFunction } from "express";
import type { User } from "../generated/prisma/client.js";
import AppError from "../errors/app.error.js";
import jwt, { ACCESS_SECRET, REFRESH_SECRET } from "../libs/jwt.js";
import TokenService from "../services/token.service.js";

export const verifyAuthToken =
	(type: "access" | "refresh") =>
	async (req: Request, _: Response, next: NextFunction) => {
		try {
			if (type !== "access" && type !== "refresh") {
				throw new AppError("Invalid token type", 500);
			}

			const secret = type === "access" ? ACCESS_SECRET : REFRESH_SECRET;

			if (!secret) {
				throw new AppError(
					`${type} secret is not set in environment variables.`,
					500,
				);
			}

			let validToken: string | undefined;

			if (type === "access") {
				const authHeader = req.headers.authorization;
				if (!authHeader)
					throw new AppError("Authorization header missing", 401);
				validToken = authHeader.split(" ")[1];
			} else if (type === "refresh") {
				validToken = req.cookies["refresh-token"];
			}

			if (!validToken) throw new AppError("Valid auth token missing", 401);

			const decoded = TokenService.verify(validToken, secret);

			if (!decoded) throw new AppError("Invalid token", 403);

			req.user = decoded as User;

			next();
		} catch (error) {
			next(error);
		}
	};
