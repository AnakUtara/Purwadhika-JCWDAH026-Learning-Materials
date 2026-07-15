import express, { Router } from "express";
import { uniqueUserGuard } from "../middlewares/auth.middleware.js";
import { verifyAuthToken } from "../middlewares/token.middleware.js";
import authController from "../controllers/auth.controller.js";
import requestValidator from "../middlewares/request-validator.middleware.js";
import { signUpSchema, signInSchema } from "../validations/auth.validation.js";

export const authResource: Router = express.Router();

// * Auth Resources
authResource.post(
	"/sign-in",
	requestValidator(signInSchema, "body"),
	authController.signIn,
);

authResource.post("/google/callback", authController.googleLogin);

authResource.post(
	"/sign-up",
	requestValidator(signUpSchema, "body"),
	uniqueUserGuard,
	authController.signUp,
);

authResource.post(
	"/refresh-token",
	verifyAuthToken("refresh"),
	authController.refreshToken,
);

authResource.use(verifyAuthToken("access"));
authResource.post("/sign-out", authController.signOut);
authResource.get("/me", authController.getAuthUser);
