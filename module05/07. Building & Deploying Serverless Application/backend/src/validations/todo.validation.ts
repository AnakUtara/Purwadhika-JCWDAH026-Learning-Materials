import z from "zod";

const toDoValidation = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be less than 255 characters"),
	completed: z.coerce.boolean().optional(),
});

const updateToDoValidation = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be less than 255 characters")
		.optional(),
	completed: z.coerce.boolean().optional(),
});

export { toDoValidation, updateToDoValidation };
