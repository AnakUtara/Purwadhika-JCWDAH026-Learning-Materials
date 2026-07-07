import * as yup from "yup";
import type {
	Product,
	ProductFormValues,
	ProductStatus,
} from "@/types/product";

const productStatusValues: ProductStatus[] = ["ACTIVE", "INACTIVE"];

export const productFormInitialValues: ProductFormValues = {
	name: "",
	sku: "",
	category: "",
	price: 0,
	stock: 0,
	status: "ACTIVE",
};

export const productFormSchema: yup.ObjectSchema<ProductFormValues> =
	yup.object({
		name: yup.string().trim().required("Name is required"),
		sku: yup.string().trim().required("SKU is required"),
		category: yup.string().trim().required("Category is required"),
		price: yup
			.number()
			.typeError("Price must be a valid number")
			.min(0, "Price cannot be negative")
			.required("Price is required"),
		stock: yup
			.number()
			.typeError("Stock must be a valid number")
			.integer("Stock must be a whole number")
			.min(0, "Stock cannot be negative")
			.required("Stock is required"),
		status: yup
			.mixed<ProductStatus>()
			.oneOf(productStatusValues, "Status is required")
			.required("Status is required"),
	});

export const getProductFormInitialValues = (
	mode: "create" | "edit",
	product?: Product,
): ProductFormValues => {
	if (mode === "edit" && product) {
		return {
			name: product.name,
			sku: product.sku,
			category: product.category,
			price: product.price,
			stock: product.stock,
			status: product.status,
		};
	}

	return productFormInitialValues;
};
