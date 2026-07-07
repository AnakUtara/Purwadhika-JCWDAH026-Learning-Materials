import { useMemo } from "react";
import type { Product } from "@/types/product";
import { getProductFormInitialValues } from "./product-form.validation";

export function useProductFormDialog(
	mode: "create" | "edit",
	product?: Product,
) {
	const title = useMemo(
		() => (mode === "create" ? "Add Product" : "Edit Product"),
		[mode],
	);

	const initialValues = useMemo(
		() => getProductFormInitialValues(mode, product),
		[mode, product],
	);

	return { initialValues, title };
}
