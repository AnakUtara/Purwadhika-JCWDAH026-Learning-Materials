import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);

app.get("/api", (_req, res: Response) => {
	res.send({ message: "Welcome to the backend API!" });
});

app.use((_req: Request, res: Response) => {
	res.status(404).send({
		message: "Endpoint tidak ditemukan",
	});
});

// Application level error handling
app.use(
	(
		error: Error | unknown,
		_req: Request,
		res: Response,
		_next: NextFunction,
	) => {
		res.status(500).send({
			message: "Terjadi error pada server",
			error: error instanceof Error ? error.message : error,
		});
	},
);

app.listen(8000, () => {
	console.log(`Server is running on port 8000`);
});
