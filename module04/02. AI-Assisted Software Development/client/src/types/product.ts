export type ProductStatus = "ACTIVE" | "INACTIVE";

export type Product = {
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

export type ProductFormValues = {
	name: string;
	sku: string;
	category: string;
	price: number;
	stock: number;
	status: ProductStatus;
};

export type ListProductsResponse = {
	items: Product[];
	total: number;
	page: number;
	limit: number;
};
