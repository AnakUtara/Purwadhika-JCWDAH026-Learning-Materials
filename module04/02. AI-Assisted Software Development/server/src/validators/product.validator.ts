import { ProductStatus } from "@/generated/prisma/enums.js";
import { z } from "zod";

export const productParamsSchema = z.object({
	id: z.string().min(1),
});

export type ProductParamsInput = z.infer<typeof productParamsSchema>;

export const listProductsQuerySchema = z.object({
	page: z.coerce.number().int().min(1).default(1),
	limit: z.coerce.number().int().min(1).max(100).default(10),
	search: z.string().optional(),
	status: z.enum(ProductStatus).optional(),
});

export type ListProductsQueryInput = z.infer<typeof listProductsQuerySchema>;

const baseProductSchema = z.object({
	name: z.string().min(1),
	sku: z.string().min(1),
	category: z.string().min(1),
	price: z.coerce.number().min(0),
	stock: z.coerce.number().int().min(0),
	status: z.enum(ProductStatus),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

export const createProductSchema = baseProductSchema;

export const updateProductSchema = baseProductSchema
	.partial()
	.refine((value) => Object.keys(value).length > 0, {
		message: "At least one field is required",
	});
