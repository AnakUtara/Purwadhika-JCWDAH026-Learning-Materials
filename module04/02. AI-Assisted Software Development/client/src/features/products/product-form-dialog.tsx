import { Form, Formik } from "formik";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Product, ProductFormValues } from "@/types/product";
import { productFormSchema } from "./product-form.validation";
import { useProductFormDialog } from "./use-product-form-dialog";

type ProductFormDialogProps = {
	mode: "create" | "edit";
	open: boolean;
	pending: boolean;
	product?: Product;
	onOpenChange: (open: boolean) => void;
	onSubmit: (values: ProductFormValues) => Promise<void>;
};

export function ProductFormDialog({
	mode,
	open,
	pending,
	product,
	onOpenChange,
	onSubmit,
}: ProductFormDialogProps) {
	const { initialValues, title } = useProductFormDialog(mode, product);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<Formik<ProductFormValues>
					initialValues={initialValues}
					enableReinitialize
					validationSchema={productFormSchema}
					onSubmit={async (values) => {
						await onSubmit(values);
						onOpenChange(false);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						handleChange,
						isSubmitting,
						setFieldTouched,
						setFieldValue,
					}) => {
						const showError = (fieldName: keyof ProductFormValues) =>
							Boolean(touched[fieldName] && errors[fieldName]);

						const errorMessage = (fieldName: keyof ProductFormValues) =>
							touched[fieldName] ? errors[fieldName] : undefined;

						return (
							<Form className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										value={values.name}
										onBlur={handleBlur}
										onChange={handleChange}
										aria-invalid={showError("name")}
										aria-describedby={
											showError("name") ? "name-error" : undefined
										}
									/>
									{errorMessage("name") ? (
										<p id="name-error" className="text-sm text-destructive">
											{errorMessage("name")}
										</p>
									) : null}
								</div>

								<div className="grid gap-2">
									<Label htmlFor="sku">SKU</Label>
									<Input
										id="sku"
										name="sku"
										value={values.sku}
										onBlur={handleBlur}
										onChange={handleChange}
										aria-invalid={showError("sku")}
										aria-describedby={
											showError("sku") ? "sku-error" : undefined
										}
									/>
									{errorMessage("sku") ? (
										<p id="sku-error" className="text-sm text-destructive">
											{errorMessage("sku")}
										</p>
									) : null}
								</div>

								<div className="grid gap-2">
									<Label htmlFor="category">Category</Label>
									<Input
										id="category"
										name="category"
										value={values.category}
										onBlur={handleBlur}
										onChange={handleChange}
										aria-invalid={showError("category")}
										aria-describedby={
											showError("category") ? "category-error" : undefined
										}
									/>
									{errorMessage("category") ? (
										<p id="category-error" className="text-sm text-destructive">
											{errorMessage("category")}
										</p>
									) : null}
								</div>

								<div className="grid grid-cols-2 gap-3">
									<div className="grid gap-2">
										<Label htmlFor="price">Price</Label>
										<Input
											id="price"
											name="price"
											type="number"
											min={0}
											step="0.01"
											value={values.price}
											onBlur={handleBlur}
											onChange={(event) => {
												const nextValue =
													event.target.value === ""
														? 0
														: Number(event.target.value);
												setFieldValue("price", nextValue);
											}}
											aria-invalid={showError("price")}
											aria-describedby={
												showError("price") ? "price-error" : undefined
											}
										/>
										{errorMessage("price") ? (
											<p id="price-error" className="text-sm text-destructive">
												{errorMessage("price")}
											</p>
										) : null}
									</div>

									<div className="grid gap-2">
										<Label htmlFor="stock">Stock</Label>
										<Input
											id="stock"
											name="stock"
											type="number"
											min={0}
											value={values.stock}
											onBlur={handleBlur}
											onChange={(event) => {
												const nextValue =
													event.target.value === ""
														? 0
														: Number(event.target.value);
												setFieldValue("stock", nextValue);
											}}
											aria-invalid={showError("stock")}
											aria-describedby={
												showError("stock") ? "stock-error" : undefined
											}
										/>
										{errorMessage("stock") ? (
											<p id="stock-error" className="text-sm text-destructive">
												{errorMessage("stock")}
											</p>
										) : null}
									</div>
								</div>

								<div className="grid gap-2">
									<Label>Status</Label>
									<Select
										value={values.status}
										onValueChange={(value) => {
											if (value) {
												void setFieldValue("status", value);
												setFieldTouched("status", true, false);
											}
										}}
									>
										<SelectTrigger
											aria-invalid={showError("status")}
											aria-describedby={
												showError("status") ? "status-error" : undefined
											}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="ACTIVE">ACTIVE</SelectItem>
											<SelectItem value="INACTIVE">INACTIVE</SelectItem>
										</SelectContent>
									</Select>
									{errorMessage("status") ? (
										<p id="status-error" className="text-sm text-destructive">
											{errorMessage("status")}
										</p>
									) : null}
								</div>

								<DialogFooter>
									<Button
										variant="outline"
										type="button"
										onClick={() => onOpenChange(false)}
										disabled={pending || isSubmitting}
									>
										Cancel
									</Button>
									<Button type="submit" disabled={pending || isSubmitting}>
										{pending || isSubmitting ? "Saving..." : "Save"}
									</Button>
								</DialogFooter>
							</Form>
						);
					}}
				</Formik>
			</DialogContent>
		</Dialog>
	);
}
