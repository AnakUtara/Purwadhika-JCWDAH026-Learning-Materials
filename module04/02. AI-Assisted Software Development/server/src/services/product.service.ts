import { ProductStatus } from "@/generated/prisma/enums.js";
import { ProductRepository } from "../repositories/product.repository.js";
import type {
	CreateProductInput,
	ProductResponse,
	UpdateProductInput,
} from "../types/product.types.js";
import { HttpError } from "../utils/http-error.js";
import { Product } from "@/generated/prisma/client.js";

type ListProductsInput = {
	search?: string;
	status?: ProductStatus;
	page: number;
	limit: number;
};

export class ProductService {
	private productRepository: ProductRepository;

	constructor(productRepository = new ProductRepository()) {
		this.productRepository = productRepository;
	}

	private toResponse(product: Product): ProductResponse {
		return {
			id: product.id,
			name: product.name,
			sku: product.sku,
			category: product.category,
			price: Number(product.price),
			stock: product.stock,
			status: product.status,
			createdAt: product.createdAt.toISOString(),
			updatedAt: product.updatedAt.toISOString(),
		};
	}

	async listProducts(input: ListProductsInput) {
		const result = await this.productRepository.list(input);

		console.log(result.items.map((item) => this.toResponse(item)));

		return {
			items: result.items.map((item) => this.toResponse(item)),
			total: result.total,
			page: input.page,
			limit: input.limit,
		};
	}

	async getProductById(id: string) {
		const product = await this.productRepository.findById(id);

		if (!product) {
			throw new HttpError(404, "Product not found");
		}

		return this.toResponse(product);
	}

	private validateBusinessRules(
		input: CreateProductInput | UpdateProductInput,
	) {
		if (input.price !== undefined && input.price < 0) {
			throw new HttpError(400, "Price must be non-negative");
		}

		if (input.stock !== undefined && input.stock < 0) {
			throw new HttpError(400, "Stock must be non-negative");
		}
	}

	async createProduct(input: CreateProductInput) {
		this.validateBusinessRules(input);

		const existing = await this.productRepository.findBySku(input.sku);
		if (existing) {
			throw new HttpError(409, "SKU already exists");
		}

		const created = await this.productRepository.create(input);
		return this.toResponse(created);
	}

	async updateProduct(id: string, input: UpdateProductInput) {
		this.validateBusinessRules(input);

		const existing = await this.productRepository.findById(id);
		if (!existing) {
			throw new HttpError(404, "Product not found");
		}

		if (input.sku && input.sku !== existing.sku) {
			const skuTaken = await this.productRepository.findBySku(input.sku);
			if (skuTaken) {
				throw new HttpError(409, "SKU already exists");
			}
		}

		const updated = await this.productRepository.update(id, input);
		return this.toResponse(updated);
	}

	async deleteProduct(id: string) {
		const existing = await this.productRepository.findById(id);
		if (!existing) {
			throw new HttpError(404, "Product not found");
		}

		await this.productRepository.delete(id);
	}
}
