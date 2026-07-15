import type { Request, Response, NextFunction } from "express";
import { appErrorHandler } from "../errors/handlers/app.error.handler.js";
import type AppError from "../errors/app.error.js";

const errorHandler = (
	error: AppError,
	_: Request,
	res: Response,
	next: NextFunction,
) => {
	appErrorHandler(error, next);
	console.table(error);
	console.error(error);
	return res.status(error.status || 500).send({
		status: error.status || 500,
		message: error.message || "Internal Server Error",
		error: error.object || null,
	});
};

export default errorHandler;
