import AppError from "../errors/app.error.js";
import { comparePassword, hashPassword } from "../libs/bcrypt.js";
import userRepo from "../repositories/user.repo.js";
import { OAuth2Client } from "google-auth-library";
import {
	ACCESS_EXPIRES_IN,
	ACCESS_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET,
} from "../libs/jwt.js";
import type { User } from "../generated/prisma/client.js";
import authRepo from "../repositories/auth.repo.js";
import TokenService from "./token.service.js";
import { GOOGLE_CLIENT_ID } from "../configs/env.config.js";

export interface IAuthResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

class AuthService {
	private googleClient: OAuth2Client = new OAuth2Client(GOOGLE_CLIENT_ID);

	async signIn(email: string, password: string): Promise<IAuthResponse> {
		const user = await userRepo.find({ email });

		if (!user) {
			throw new AppError("Invalid email or password", 401);
		}

		if (!user.password) {
			throw new AppError("Please sign in with Google", 401);
		}

		const isPassValid = await comparePassword(password, user.password);

		if (!isPassValid) {
			throw new AppError("Invalid email or password", 401);
		}

		const accessToken = TokenService.generate(
			{ id: user.id, email: user.email },
			ACCESS_SECRET!,
			ACCESS_EXPIRES_IN!,
		);

		const refreshToken = TokenService.generate(
			{ id: user.id, email: user.email },
			REFRESH_SECRET!,
			REFRESH_EXPIRES_IN!,
		);

		return { user: { ...user, password: null }, accessToken, refreshToken };
	}

	async refreshAccessToken(userId: number): Promise<IAuthResponse> {
		const user = await userRepo.find({ id: userId });

		if (!user) throw new AppError("User not found", 404);

		// Generate new tokens
		const newAccessToken = TokenService.generate(
			{ id: user.id, email: user.email },
			ACCESS_SECRET!,
			ACCESS_EXPIRES_IN!,
		);

		const newRefreshToken = TokenService.generate(
			{ id: user.id, email: user.email },
			REFRESH_SECRET!,
			REFRESH_EXPIRES_IN!,
		);

		return {
			user: { ...user, password: null },
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		};
	}

	async googleSignIn(idToken: string): Promise<IAuthResponse> {
		const ticket = await this.googleClient.verifyIdToken({
			idToken,
			audience: GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload?.email || !payload.sub) {
			throw new AppError("Invalid Social token payload", 401);
		}

		const { email, sub: providerAccountId } = payload;

		const user = await authRepo.upsertSocialAccount(
			email,
			"google",
			providerAccountId,
		);

		const accessToken = TokenService.generate(
			{ id: user.id, email: user.email },
			ACCESS_SECRET!,
			ACCESS_EXPIRES_IN!,
		);

		const refreshToken = TokenService.generate(
			{ id: user.id, email: user.email },
			REFRESH_SECRET!,
			REFRESH_EXPIRES_IN!,
		);

		return { user: { ...user, password: null }, accessToken, refreshToken };
	}
}

export default new AuthService();
