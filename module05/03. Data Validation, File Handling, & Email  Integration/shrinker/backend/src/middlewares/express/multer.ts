import type { Request } from "express";
import multer from "multer";
import AppError from "../../errors/app.error.js";

const buildUploader = (acceptedMimeTypes: string[], maxFileSizeMB: number) => {
	const fileFilter = (
		_: Request,
		file: Express.Multer.File,
		cb: multer.FileFilterCallback,
	) => {
		if (!acceptedMimeTypes.includes(file.mimetype)) {
			cb(
				new AppError(
					"Accepted file types are: " + acceptedMimeTypes.join(", "),
					400,
				),
			);
		} else {
			cb(null, true);
		}
	};

	const ONE_MB = 1 * 1024 ** 2;
	const limits = { fileSize: maxFileSizeMB * ONE_MB };

	return multer({ fileFilter, limits });
};

export const imageUploader = (limit: number = 1) =>
	buildUploader(["image/png", "image/jpeg", "image/webp", "image/gif"], limit);

export const fileUploader = (limit: number = 2.5) =>
	buildUploader(
		[
			"text/plain",
			"application/pdf",
			"application/msword",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/vnd.ms-powerpoint",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		],
		limit,
	);
