import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

export function validateRequest(
	schema: ZodObject,
	source: "body" | "params" | "query" = "body",
) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const parsed = schema.parse(req[source]);
			if (source === "body") {
				req.validatedBody = parsed;
			} else if (source === "params") {
				req.validatedParams = parsed;
			} else {
				req.validatedQuery = parsed;
			}
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				res.status(400).json({
					message: "Validation error",
					errors: error.issues.map((issue) => ({
						path: issue.path.join("."),
						message: issue.message,
					})),
				});
				return;
			}

			next(error);
		}
	};
}
