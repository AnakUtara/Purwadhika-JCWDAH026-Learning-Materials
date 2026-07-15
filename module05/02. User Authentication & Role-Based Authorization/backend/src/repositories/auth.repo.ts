import type { User } from "../generated/prisma/client.js";
import { prisma } from "../libs/prisma.client.js";

class AuthRepository {
	async upsertSocialAccount(
		email: string,
		provider: string,
		providerAccountId: string,
	): Promise<User> {
		const user = await prisma.$transaction(async (tx) => {
			const user = await tx.user.upsert({
				where: { email },
				create: { email },
				update: {},
			});

			await tx.account.upsert({
				where: {
					provider_providerAccountId: {
						provider,
						providerAccountId,
					},
				},
				create: {
					provider,
					providerAccountId,
					user: {
						connect: { id: user.id },
					},
				},
				update: {},
			});

			return user;
		});

		return user;
	}
}

export default new AuthRepository();
