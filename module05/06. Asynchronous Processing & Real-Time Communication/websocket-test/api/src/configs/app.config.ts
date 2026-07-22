import express, { urlencoded } from "express";
import type { Application } from "express";
import cors from "cors";
import { CLIENT_ORIGIN } from "./env.config.js";

const configureApp = (app: Application) => {
	app.use(express.json());
	app.use(urlencoded({ extended: true }));
	app.use(
		cors({
			origin: CLIENT_ORIGIN,
			credentials: true,
		}),
	);
};

export default configureApp;
