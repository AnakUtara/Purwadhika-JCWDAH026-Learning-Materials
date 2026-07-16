import Yup from "../libs/yup";

const createFileValidator = (
	mimeTypes: string[] = ["image/png", "image/jpeg", "image/webp"],
	maxSizeInMB: number = 5,
) => {
	const maxSizeBytes = maxSizeInMB * 1024 * 1024;

	return Yup.mixed<File>()
		.required("File is required")
		.nullable()
		.typeError("Must be a file")
		.test("fileType", `Allowed types: ${mimeTypes.join(", ")}`, (value) => {
			if (!value) return false;
			return mimeTypes.includes(value.type);
		})
		.test(
			"fileSize",
			`File size must be less than ${maxSizeInMB}MB`,
			(value) => {
				if (!value) return false;
				return value.size <= maxSizeBytes;
			},
		);
};

export const imageCompressionFormValidator = Yup.object({
	file: createFileValidator(
		["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"],
		10, // 10MB max
	),
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	shrinkLevel: Yup.string()
		.oneOf(
			["low", "medium", "high"],
			"Shrink level must be one of: low, medium, high",
		)
		.required("Shrink level is required")
		.default("medium"),
});

export type CompressionFormType = Yup.InferType<
	typeof imageCompressionFormValidator
>;
