import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/app.error.js";
import Cloudinary from "../libs/cloudinary.js";
import { Readable } from "stream";
import EmailService from "../services/email.service.js";
import renderTemplate from "../libs/handlebars.js";

class CloudinaryStorageController {
	private baseDir = "learn_file_handling";

	uploadImage = (req: Request, res: Response, next: NextFunction) => {
		const { email } = req.body;
		if (!email) throw new AppError("Email is required", 400);
		if (!req.file) throw new AppError("No file uploaded", 400);

		const stream = Cloudinary.uploader.upload_stream(
			{ folder: `${this.baseDir}/images` },
			(err, result) => {
				if (err || !result)
					return next(new AppError("Upload failed", 500, err));

				EmailService.sendEmail(
					email,
					"File Upload Successful",
					renderTemplate("upload-success.email.hbs", {
						fileUrl: result.secure_url,
					}),
				);

				return res.send({
					status: 200,
					message: "Image uploaded successfully!",
					data: { url: result.secure_url },
				});
			},
		);

		Readable.from(req.file?.buffer).pipe(stream);
	};
}

export default new CloudinaryStorageController();
