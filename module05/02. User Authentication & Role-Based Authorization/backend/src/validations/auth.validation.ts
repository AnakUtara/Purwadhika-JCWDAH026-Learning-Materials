import z from "zod/v4";

const commonSchema = {
	email: z
		.email("Invalid email format")
		.min(5, "Email must be at least 5 characters")
		.max(255, "Email must be at most 255 characters"),
	password: z
		.string()
		.regex(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
			"Password must be at least 6 characters and contain at least one letter and one number",
		),
};

export const signUpSchema = z
	.object({
		...commonSchema,
		confirmPassword: z
			.string()
			.min(6, "Confirm password must be at least 6 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
	});

export const signInSchema = z.object({
	...commonSchema,
});
