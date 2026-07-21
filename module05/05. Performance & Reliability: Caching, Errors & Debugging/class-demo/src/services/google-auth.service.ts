import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../configs/env.config.js";
import AppError from "../errors/app.error.js";
import { prisma } from "../libs/prisma.client.js";
import type { UserRole } from "../generated/prisma/enums.js";
import AuthService from "./auth.service.js";
import {
	ACCESS_EXPIRES_IN,
	ACCESS_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET,
} from "../configs/jwt.config.js";
import refreshTokenService from "./refresh-token.service.js";

const GoogleAuthService = {
	async verifyIdToken(idToken: string, role: UserRole = "USER") {
		const client = new OAuth2Client(GOOGLE_CLIENT_ID);

		const ticket = await client.verifyIdToken({
			idToken,
			audience: GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload?.email || !payload.sub) {
			throw new AppError("Invalid Google ID token", 400);
		}

		const user = await prisma.$transaction(async (tx) => {
			const user = await tx.user.upsert({
				where: { email: payload.email },
				update: {},
				create: {
					email: payload?.email || "",
					role,
				},
			});

			await tx.account.upsert({
				where: {
					provider_providerAccountId: {
						provider: "google",
						providerAccountId: payload.sub,
					},
				},
				create: {
					provider: "google",
					providerAccountId: payload.sub,
					user: {
						connect: { id: user.id },
					},
				},
				update: {},
			});

			return user;
		});

		const tokenPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
		};

		await refreshTokenService.invalidate(user.id);

		const accessToken = AuthService.generateToken(
			tokenPayload,
			ACCESS_SECRET!,
			ACCESS_EXPIRES_IN!,
		);

		const refreshToken = AuthService.generateToken(
			tokenPayload,
			REFRESH_SECRET!,
			REFRESH_EXPIRES_IN!,
		);

		await refreshTokenService.store(
			refreshToken,
			Number(REFRESH_EXPIRES_IN),
			user.id,
		);

		return {
			user: { ...user, password: null },
			accessToken,
			refreshToken,
		};
	},
};

export default GoogleAuthService;
