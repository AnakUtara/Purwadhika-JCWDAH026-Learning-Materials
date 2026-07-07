import type { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";
import { ProductStatus } from "@/generated/prisma/enums.js";
import type {
	CreateProductInput,
	ListProductsQueryInput,
	ProductParamsInput,
	UpdateProductInput,
} from "../validators/product.validator.js";

export class ProductController {
	private productService: ProductService;

	constructor(productService = new ProductService()) {
		this.productService = productService;
	}

	list = async (req: Request, res: Response) => {
		const { page, limit, search, status } =
			req.validatedQuery as ListProductsQueryInput;

		const data = await this.productService.listProducts({
			page,
			limit,
			search,
			status,
		});

		res.status(200).send({ message: "Products fetched successfully", data });
	};

	getById = async (req: Request, res: Response) => {
		const { id } = req.validatedParams as ProductParamsInput;

		const data = await this.productService.getProductById(id);
		res.status(200).send({ message: "Product fetched successfully", data });
	};

	create = async (req: Request, res: Response) => {
		const data = await this.productService.createProduct(
			req.validatedBody as CreateProductInput,
		);
		res.status(201).send({ message: "Product created successfully", data });
	};

	update = async (req: Request, res: Response) => {
		const { id } = req.validatedParams as ProductParamsInput;
		const payload = req.validatedBody as UpdateProductInput;

		const data = await this.productService.updateProduct(id, payload);
		res.status(200).send({ message: "Product updated successfully", data });
	};

	delete = async (req: Request, res: Response) => {
		const { id } = req.validatedParams as ProductParamsInput;

		await this.productService.deleteProduct(id);
		res.status(200).send({ message: "Product deleted successfully" });
	};
}
