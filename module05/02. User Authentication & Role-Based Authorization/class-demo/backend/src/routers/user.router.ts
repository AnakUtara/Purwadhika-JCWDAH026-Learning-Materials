import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import { roleGuard, verifyToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get(
	"/",
	verifyToken("access"),
	roleGuard("ADMIN"),
	UserController.getAll,
);

export default userRouter;
