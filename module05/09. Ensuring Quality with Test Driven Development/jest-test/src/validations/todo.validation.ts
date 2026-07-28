import z from "zod";

const toDoValidation = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(255, "Title must be less than 255 characters"),
	completed: z.boolean().optional(),
});

const toDoUpdateValidation = toDoValidation.partial();

export { toDoValidation, toDoUpdateValidation };
