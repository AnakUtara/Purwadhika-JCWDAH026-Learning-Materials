import z from "zod";

const compressionValidation = z.object({
	shrinkLevel: z.enum(
		["low", "medium", "high"],
		"Shrink level must be one of: low, medium, high",
	),
	email: z
		.email("Email: Invalid email format")
		.min(5, "Email must be at least 5 characters")
		.max(255, "Email must be at most 255 characters"),
});

export type CompressionValidationType = z.infer<typeof compressionValidation>;

export default compressionValidation;
