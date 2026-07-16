import { ErrorMessage, Form, Formik } from "formik";
import DropzoneInput from "./components/inputs/dropzone.input";
import { Button, Label, Select, TextInput } from "flowbite-react";
import {
	CompressionFormType,
	imageCompressionFormValidator,
} from "./validators/file.validator";
import { imageShrinkingProcessor } from "./api/shrink-processor.api";
import { toast } from "sonner";

export default function App() {
	return (
		<main className="bg-white dark:bg-gray-900">
			<div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4">
				<h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
					<span className="bg-linear-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
						{import.meta.env.VITE_APP_NAME}
					</span>
				</h1>
				<Formik
					initialValues={{
						file: null,
						email: "",
						shrinkLevel: "medium",
					}}
					validationSchema={imageCompressionFormValidator}
					onSubmit={async (values, { resetForm }) => {
						try {
							await imageShrinkingProcessor(values as CompressionFormType);
							toast.success(
								`Image compressed successfully & sent to ${values.email}!`,
							);
							resetForm();
						} catch (error) {
							toast.error(
								`Failed to compress image & send email: ${error instanceof Error ? error.message : "Unknown error"}`,
							);
						}
					}}
				>
					{({
						setFieldValue,
						setFieldTouched,
						values: { file },
						getFieldProps,
						isSubmitting,
					}) => {
						return (
							<Form className="flex w-full max-w-lg flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
								<div>
									<Label htmlFor="email">Email</Label>
									<TextInput
										{...getFieldProps("email")}
										disabled={isSubmitting}
									/>
									<ErrorMessage name="email">
										{(msg) => (
											<p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
												{msg}
											</p>
										)}
									</ErrorMessage>
								</div>
								<div className="w-full">
									<div className="mb-2 block">
										<Label htmlFor="shrinkLevel">Shrink Level: </Label>
									</div>
									<Select
										id="shrinkLevel"
										{...getFieldProps("shrinkLevel")}
										disabled={isSubmitting}
									>
										<option value="low">Low</option>
										<option value="medium">Medium</option>
										<option value="high">High</option>
									</Select>
									<ErrorMessage name="shrinkLevel">
										{(msg) => (
											<p className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
												{msg}
											</p>
										)}
									</ErrorMessage>
								</div>
								<div className="relative flex justify-center items-center w-full">
									{file ? (
										<div className="absolute z-50">
											<img
												src={URL.createObjectURL(file)}
												alt={(file as File).name}
												className="max-h-56 w-full rounded-lg object-cover"
											/>
											<Button
												size="sm"
												color="red"
												disabled={isSubmitting}
												className="absolute top-1 right-1 size-8 p-0 cursor-pointer rounded-full"
												onClick={() => setFieldValue("file", null)}
											>
												<svg
													className="size-6 text-gray-800 dark:text-white"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
													/>
												</svg>
											</Button>
										</div>
									) : null}
									<DropzoneInput
										disabled={isSubmitting || file !== null}
										onFileChange={async (file) => {
											setFieldTouched("file", true);
											try {
												await imageCompressionFormValidator.validateAt("file", {
													file,
												});
												setFieldValue("file", file);
											} catch {
												setFieldValue("file", null);
											}
										}}
									/>
								</div>
								<Button
									type="submit"
									className="mt-4 w-full"
									disabled={!file || isSubmitting}
								>
									{isSubmitting ? "Shrinking..." : "Shrink!"}
								</Button>
							</Form>
						);
					}}
				</Formik>
			</div>
		</main>
	);
}
