import type { Request, Response, NextFunction } from "express";
import { prisma } from "../libs/prisma.client.js";
import AppError from "../errors/app.error.js";
import AuthService from "../services/auth.service.js";
import {
	ACCESS_EXPIRES_IN,
	ACCESS_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET,
} from "../configs/jwt.config.js";
import cookieConfig from "../configs/cookie.config.js";
import { UserRole } from "../generated/prisma/enums.js";
import GoogleAuthService from "../services/google.auth.service.js";

const AuthController = {
	signIn: async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (!existingUser) {
			throw new AppError("User not found", 404);
		}

		const validPassword = await AuthService.comparePassword(
			password,
			existingUser.password || "",
		);

		if (!validPassword) {
			throw new AppError("Invalid password", 401);
		}

		const tokenPayload = {
			id: existingUser.id,
			email: existingUser.email,
			role: existingUser.role,
		};

		const accessToken = AuthService.generateToken(
			tokenPayload,
			ACCESS_SECRET,
			ACCESS_EXPIRES_IN,
		);

		const refreshToken = AuthService.generateToken(
			tokenPayload,
			REFRESH_SECRET,
			REFRESH_EXPIRES_IN,
		);

		res.cookie("refresh-token", refreshToken, cookieConfig).send({
			message: "Sign in successful!",
			data: {
				user: { ...existingUser, password: null },
				accessToken,
			},
		});
	},

	signOut: async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user || !req.cookies["refresh-token"]) {
			throw new AppError("User not authenticated", 401);
		}

		res.clearCookie("refresh-token", cookieConfig).send({
			message: "Sign out successful!",
		});
	},

	signUp: async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, role } = req.body;

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			throw new AppError("User already exists", 400);
		}

		const hashedPassword = await AuthService.hashPassword(password);

		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				role: role ?? UserRole.USER,
			},
		});

		res.status(201).send({
			message: "User registered successfully",
		});
	},

	getAuthUser: async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			throw new AppError("User not authenticated", 401);
		}

		const { id } = req.user;

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});

		res.send({
			message: "Authenticated user fetched successfully",
			user: {
				...user,
				password: null,
			},
		});
	},

	googleSignIn: async (req: Request, res: Response, next: NextFunction) => {
		const { idToken } = req.body;

		if (!idToken) {
			throw new AppError("Google ID token missing", 400);
		}

		const { user, accessToken, refreshToken } =
			await GoogleAuthService.verifyIdToken(idToken);

		res.cookie("refresh-token", refreshToken, cookieConfig).send({
			message: "Google sign-in successful",
			data: {
				user,
				accessToken,
			},
		});
	},
};

export default AuthController;
