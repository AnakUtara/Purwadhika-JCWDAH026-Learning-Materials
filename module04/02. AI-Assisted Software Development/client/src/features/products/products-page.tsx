import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
	createProduct,
	deleteProduct,
	getProducts,
	updateProduct,
} from "@/lib/api";
import type { Product, ProductFormValues } from "@/types/product";
import { ProductFormDialog } from "./product-form-dialog";

export function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [isCreateOpen, setIsCreateOpen] = useState(false);
	const [editTarget, setEditTarget] = useState<Product | null>(null);
	const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
	const [pendingSubmit, setPendingSubmit] = useState(false);

	const activeCount = useMemo(
		() => products.filter((product) => product.status === "ACTIVE").length,
		[products],
	);

	const fetchProducts = async () => {
		setLoading(true);
		setError(null);

		try {
			const data = await getProducts();
			setProducts(data);
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Failed to load products",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	const handleCreate = async (values: ProductFormValues) => {
		setPendingSubmit(true);
		try {
			await createProduct(values);
			await fetchProducts();
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Failed to create product",
			);
		} finally {
			setPendingSubmit(false);
		}
	};

	const handleUpdate = async (values: ProductFormValues) => {
		if (!editTarget) return;

		setPendingSubmit(true);
		try {
			await updateProduct(editTarget.id, values);
			await fetchProducts();
			setEditTarget(null);
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Failed to update product",
			);
		} finally {
			setPendingSubmit(false);
		}
	};

	const handleDelete = async () => {
		if (!deleteTarget) return;

		try {
			await deleteProduct(deleteTarget.id);
			await fetchProducts();
			setDeleteTarget(null);
		} catch (requestError) {
			setError(
				requestError instanceof Error
					? requestError.message
					: "Failed to delete product",
			);
		}
	};

	return (
		<main className="min-h-screen bg-linear-to-b from-zinc-50 to-zinc-100 p-6 md:p-10">
			<div className="mx-auto max-w-6xl space-y-6">
				<section className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
					<div className="space-y-2">
						<h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
							Product Management Dashboard
						</h1>
						<p className="text-sm text-zinc-600">
							Manage your inventory catalog with add, edit, and delete
							workflows.
						</p>
					</div>

					<div className="flex items-center gap-3">
						<Badge variant="secondary">Total: {products.length}</Badge>
						<Badge>Active: {activeCount}</Badge>
						<Button onClick={() => setIsCreateOpen(true)}>Add Product</Button>
					</div>
				</section>

				<Card>
					<CardHeader>
						<CardTitle>Products</CardTitle>
					</CardHeader>
					<CardContent>
						{loading ? (
							<p className="text-sm text-zinc-500">Loading products...</p>
						) : error ? (
							<p className="text-sm text-red-600">{error}</p>
						) : products.length === 0 ? (
							<p className="text-sm text-zinc-500">No products available.</p>
						) : (
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Name</TableHead>
											<TableHead>SKU</TableHead>
											<TableHead>Category</TableHead>
											<TableHead className="text-right">Price</TableHead>
											<TableHead className="text-right">Stock</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="text-right">Actions</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{products.map((product) => (
											<TableRow key={product.id}>
												<TableCell>{product.name}</TableCell>
												<TableCell>{product.sku}</TableCell>
												<TableCell>{product.category}</TableCell>
												<TableCell className="text-right">
													{new Intl.NumberFormat("id-ID", {
														style: "currency",
														currency: "IDR",
													}).format(product.price)}
												</TableCell>
												<TableCell className="text-right">
													{product.stock}
												</TableCell>
												<TableCell>
													<Badge
														variant={
															product.status === "ACTIVE"
																? "default"
																: "secondary"
														}
													>
														{product.status}
													</Badge>
												</TableCell>
												<TableCell className="space-x-2 text-right">
													<Button
														variant="outline"
														size="sm"
														onClick={() => setEditTarget(product)}
													>
														Edit
													</Button>
													<Button
														variant="destructive"
														size="sm"
														onClick={() => setDeleteTarget(product)}
													>
														Delete
													</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<ProductFormDialog
				mode="create"
				open={isCreateOpen}
				pending={pendingSubmit}
				onOpenChange={setIsCreateOpen}
				onSubmit={handleCreate}
			/>

			<ProductFormDialog
				mode="edit"
				open={Boolean(editTarget)}
				pending={pendingSubmit}
				product={editTarget ?? undefined}
				onOpenChange={(open) => {
					if (!open) {
						setEditTarget(null);
					}
				}}
				onSubmit={handleUpdate}
			/>

			<AlertDialog
				open={Boolean(deleteTarget)}
				onOpenChange={(open) => !open && setDeleteTarget(null)}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete {deleteTarget?.name}?</AlertDialogTitle>
					</AlertDialogHeader>
					<p className="text-sm text-zinc-600">This action cannot be undone.</p>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</main>
	);
}
