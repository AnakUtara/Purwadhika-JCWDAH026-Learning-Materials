import type { Application, Request, Response } from "express";
import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./configs/cors.config.js";
import errorHandler from "./middlewares/error-handler.middleware.js";
import { authRouter } from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import postRouter from "./routers/post.router.js";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

const apiRouter = Router();

// * Prefix all routes with /api
app.use("/api", apiRouter);

apiRouter.get("/", (_, res) => res.send("Welcome to the API"));
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/posts", postRouter);

// * 404 Handler
app.use((_: Request, res: Response) => {
	console.error("404 Not Found");
	return res.status(404).send({ message: "Not Found" });
});

// * Global Error Handler
app.use(errorHandler);
