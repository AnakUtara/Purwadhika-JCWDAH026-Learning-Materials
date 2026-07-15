import AppError from "../errors/app.error.js";
import type { User } from "../generated/prisma/client.js";
import type { UserCreateInput } from "../generated/prisma/models.js";
import { hashPassword } from "../libs/bcrypt.js";
import userRepo from "../repositories/user.repo.js";

class UserService {
	async findById(id: number): Promise<User | null> {
		const user = await userRepo.find({ id });

		if (!user) {
			throw new AppError("User not found", 404);
		}

		return { ...user, password: null };
	}

	async create(data: UserCreateInput): Promise<User> {
		const hashedPassword = data.password
			? await hashPassword(data.password)
			: undefined;
		if (data.password && !hashedPassword) {
			throw new AppError("Error hashing password");
		}
		return await userRepo.create({ ...data, password: hashedPassword });
	}
}

export default new UserService();
