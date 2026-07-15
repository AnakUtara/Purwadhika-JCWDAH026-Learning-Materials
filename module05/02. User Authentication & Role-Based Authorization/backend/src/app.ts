import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRoute from "./routers/api.router.js";
import corsOptions from "./configs/cors.config.js";
import errorHandler from "./middlewares/error-handler.middleware.js";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// * Prefix all routes with /api
app.use("/api", apiRoute);

// * 404 Handler
app.use((_: Request, res: Response) => {
	console.error("404 Not Found");
	return res.status(404).send({ message: "Not Found" });
});

// * Global Error Handler
app.use(errorHandler);
