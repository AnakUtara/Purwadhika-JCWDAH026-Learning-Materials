import AppError from "../errors/app.error.js";
import redisCacheService from "./redis-cache.service.js";

class RefreshTokenService {
	private getKey(userId: number) {
		return `refresh_token:${userId}`;
	}

	async store(token: string, expiresIn: number, userId: number): Promise<"OK"> {
		return redisCacheService.set(
			this.getKey(userId),
			token,
			expiresIn, // Redis handles auto-expiration
		);
	}

	async validate(token: string, userId: number): Promise<boolean> {
		const stored = await redisCacheService.get(this.getKey(userId));
		return JSON.parse(stored || "") === token;
	}

	async invalidate(userId: number): Promise<number> {
		return redisCacheService.delete(this.getKey(userId));
	}

	async rotate(
		oldToken: string,
		newToken: string,
		expiresIn: number,
		userId: number,
	): Promise<"OK"> {
		const isValid = await this.validate(oldToken, userId);
		if (!isValid) {
			throw new AppError("Invalid refresh token", 401);
		}

		await this.invalidate(userId);
		return this.store(newToken, expiresIn, userId);
	}
}

export default new RefreshTokenService();
