import axios from "axios";
import type {
	ListProductsResponse,
	Product,
	ProductFormValues,
} from "@/types/product";

type ApiResponse<T> = {
	message: string;
	data: T;
};

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api/v1",
	timeout: 10000,
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.message ?? "Unexpected request error";
		return Promise.reject(new Error(message));
	},
);

export async function getProducts() {
	const response =
		await api.get<ApiResponse<ListProductsResponse>>("/products");
	return response.data.data.items;
}

export async function createProduct(payload: ProductFormValues) {
	const response = await api.post<ApiResponse<Product>>("/products", payload);
	return response.data.data;
}

export async function updateProduct(id: string, payload: ProductFormValues) {
	const response = await api.patch<ApiResponse<Product>>(
		`/products/${id}`,
		payload,
	);
	return response.data.data;
}

export async function deleteProduct(id: string) {
	await api.delete(`/products/${id}`);
}
