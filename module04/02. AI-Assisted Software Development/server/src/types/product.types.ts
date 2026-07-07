import { ProductStatus } from "@/generated/prisma/enums.js";

export type ProductResponse = {
	id: string;
	name: string;
	sku: string;
	category: string;
	price: number;
	stock: number;
	status: ProductStatus;
	createdAt: string;
	updatedAt: string;
};

export type CreateProductInput = {
	name: string;
	sku: string;
	category: string;
	price: number;
	stock: number;
	status: ProductStatus;
};

export type UpdateProductInput = Partial<CreateProductInput>;
