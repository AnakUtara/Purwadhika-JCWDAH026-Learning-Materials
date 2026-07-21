import type { Request, Response, NextFunction } from "express";
import { appErrorHandler } from "../errors/handlers/app.error.handler.js";
import AppError from "../errors/app.error.js";
import logger from "../utils/logger.js";

const errorHandler = (
	error: AppError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const logMessage = `${req.method} ${req.originalUrl} : ${error.message}`;

	logger.error(logMessage, {
		statusCode: error instanceof AppError ? error.status : 500,
		isOperational: error instanceof AppError ? error.isOperational : false,
	});

	console.error(
		`❌ [ERROR HANDLER] ${error.name}: ${error.message} | Stack: ${error.stack}`,
	);
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
