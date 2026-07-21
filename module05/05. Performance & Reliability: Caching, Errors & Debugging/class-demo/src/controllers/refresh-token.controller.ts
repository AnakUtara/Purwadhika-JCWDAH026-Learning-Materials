import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/app.error.js";
import AuthService from "../services/auth.service.js";
import {
	ACCESS_EXPIRES_IN,
	ACCESS_SECRET,
	REFRESH_EXPIRES_IN,
	REFRESH_SECRET,
} from "../configs/jwt.config.js";
import type { User } from "../generated/prisma/client.js";
import cookieConfig from "../configs/cookie.config.js";
import type { JwtPayload } from "jsonwebtoken";
import { prisma } from "../libs/prisma.client.js";
import refreshTokenService from "../services/refresh-token.service.js";

const RefreshTokenController = {
	refreshToken: async (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) return next(new AppError("User not authenticated", 401));

		const validRefreshToken = req.cookies["refresh-token"];

		const isValid = await refreshTokenService.validate(
			validRefreshToken,
			(req.user?.id as number) || 0,
		);

		if (!isValid) {
			return next(new AppError("Refresh token not provided", 401));
		}

		const { iat, exp, ...decode } = AuthService.verifyToken(
			validRefreshToken,
			REFRESH_SECRET,
		) as JwtPayload;

		console.log("Decoded refresh token:", decode);

		if (!decode) {
			return next(new AppError("Invalid refresh token", 403));
		}

		const user = await prisma.user.findUnique({
			where: { id: decode.id },
		});

		const newAccessToken = AuthService.generateToken(
			decode as User,
			ACCESS_SECRET,
			ACCESS_EXPIRES_IN,
		);

		const newRefreshToken = AuthService.generateToken(
			decode as User,
			REFRESH_SECRET,
			REFRESH_EXPIRES_IN,
		);

		await refreshTokenService.rotate(
			validRefreshToken,
			newRefreshToken,
			Number(REFRESH_EXPIRES_IN),
			decode.id,
		);

		res.clearCookie("refresh-token", cookieConfig);

		res.cookie("refresh-token", newRefreshToken, cookieConfig).send({
			message: "Token refreshed successfully",
			data: { user: { ...user, password: null }, accessToken: newAccessToken },
		});
	},
};

export default RefreshTokenController;
