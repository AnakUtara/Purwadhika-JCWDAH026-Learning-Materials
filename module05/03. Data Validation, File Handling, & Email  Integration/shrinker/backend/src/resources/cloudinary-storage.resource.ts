import express, { Router } from "express";
import { imageUploader, fileUploader } from "../middlewares/express/multer.js";
import cloudinaryStorageController from "../controllers/cloudinary-storage.controller.js";

export const cloudinaryStorageRouter: Router = express.Router();

cloudinaryStorageRouter.post(
	"/image",
	imageUploader().single("file"),
	cloudinaryStorageController.uploadImage,
);

cloudinaryStorageRouter.post(
	"/file",
	fileUploader().single("file"),
	cloudinaryStorageController.uploadFile,
);
