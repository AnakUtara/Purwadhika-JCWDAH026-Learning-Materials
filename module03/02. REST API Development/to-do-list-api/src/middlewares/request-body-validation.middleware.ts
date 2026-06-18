import type { NextFunction, Request, Response } from "express";
import type { AnyObjectSchema } from "yup";

// Contoh pemisahan middleware untuk dipakai di route-level
// Pemanggilan middleware ini akan dilakukan di file route handler untuk tiap endpoint resource yang membutuhkan
// validasi request body

// Pakai closure supaya callback-nya bisa menerima parameter schema untuk validasi request body
// dengan schema yang berbeda-beda sesuai kebutuhan di tiap endpoint
const requestBodyValidation =
	(schema: AnyObjectSchema) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		try {
			await schema.validate(req.body);
			next();
		} catch (error) {
			next(error);
		}
	};

export { requestBodyValidation };
