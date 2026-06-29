import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { requestBodyValidation } from "../middlewares/request-body-validation.middleware.js";
import { signInSchema, signUpSchema } from "../validations/auth.schema.js";

const authResource = Router();

authResource.get("/:id", AuthController.getMe);
authResource.post(
	"/sign-up",
	requestBodyValidation(signUpSchema),
	AuthController.signUp,
);
authResource.post(
	"/sign-in",
	requestBodyValidation(signInSchema),
	AuthController.signIn,
);

export default authResource;
