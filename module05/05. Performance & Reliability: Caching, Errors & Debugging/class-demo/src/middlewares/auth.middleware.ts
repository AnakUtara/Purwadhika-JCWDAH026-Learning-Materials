import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/app.error.js";
import { ACCESS_SECRET, REFRESH_SECRET } from "../configs/jwt.config.js";
import AuthService from "../services/auth.service.js";
import type { User, UserRole } from "../generated/prisma/client.js";

export const verifyToken =
	(type: "access" | "refresh") =>
	async (req: Request, _: Response, next: NextFunction) => {
		try {
			let token: string | undefined;
			let secret: string | undefined;
			if (type === "access") {
				token = req.headers.authorization?.split(" ")[1];
				secret = ACCESS_SECRET;
			} else if (type === "refresh") {
				token = req.cookies["refresh-token"];
				secret = REFRESH_SECRET;
			}

			if (!token) {
				return next(new AppError("Token not provided", 401));
			}

			if (!secret) {
				return next(new AppError("Secret not provided", 500));
			}

			const decode = AuthService.verifyToken(token, secret);

			if (!decode) {
				return next(new AppError("Invalid token", 403));
			}

			req.user = decode as User;
			next();
		} catch (error) {
			next(error);
		}
	};

export const roleGuard =
	(role: UserRole) => (req: Request, _: Response, next: NextFunction) => {
		if (!req.user) {
			return next(new AppError("User not authenticated", 401));
		}

		if (req.user.role !== role) {
			return next(new AppError("Forbidden: Insufficient role", 403));
		}

		next();
	};
