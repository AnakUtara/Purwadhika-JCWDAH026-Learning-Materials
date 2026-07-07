import { ProductStatus } from "@/generated/prisma/enums.js";
import { ProductWhereInput } from "@/generated/prisma/models.js";
import { prisma } from "@/lib/prisma.js";
import type {
	CreateProductInput,
	UpdateProductInput,
} from "@/types/product.types.js";

type ListProductsArgs = {
	search?: string;
	status?: ProductStatus;
	page: number;
	limit: number;
};

export class ProductRepository {
	async list({ search, status, page, limit }: ListProductsArgs) {
		const where: ProductWhereInput = {
			...(search
				? {
						OR: [
							{ name: { contains: search, mode: "insensitive" } },
							{ sku: { contains: search, mode: "insensitive" } },
							{ category: { contains: search, mode: "insensitive" } },
						],
					}
				: {}),
			...(status ? { status } : {}),
		};

		const [items, total] = await Promise.all([
			prisma.product.findMany({
				where,
				orderBy: { createdAt: "desc" },
				skip: (page - 1) * limit,
				take: limit,
			}),
			prisma.product.count({ where }),
		]);

		return { items, total };
	}

	findById(id: string) {
		return prisma.product.findUnique({ where: { id } });
	}

	findBySku(sku: string) {
		return prisma.product.findUnique({ where: { sku } });
	}

	create(data: CreateProductInput) {
		return prisma.product.create({ data });
	}

	update(id: string, data: UpdateProductInput) {
		return prisma.product.update({ where: { id }, data });
	}

	delete(id: string) {
		return prisma.product.delete({ where: { id } });
	}
}
