import type { PrismaPromise } from "../generated/prisma/internal/prismaNamespace.js";
import { prisma } from "../libs/prisma.client.js";

// utils/pagination.util.ts
export interface IPaginationParams {
	page?: number;
	limit?: number;
}

export interface IPaginatedResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export async function paginate<T>(
	findFn: (skip: number, take: number) => PrismaPromise<T[]>,
	countFn: () => PrismaPromise<number>,
	{ page = 1, limit = 10 }: IPaginationParams = {},
): Promise<IPaginatedResult<T>> {
	const skip = (page - 1) * limit;
	const [data, total] = await prisma.$transaction([
		findFn(skip, limit),
		countFn(),
	]);
	return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
}
