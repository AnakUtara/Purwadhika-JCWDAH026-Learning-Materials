import cors from "cors";
import express from "express";
import morgan from "morgan";
import { apiRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";

export const app = express();

app.use(
	cors({
		origin: process.env.CLIENT_URL,
	}),
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", apiRoutes);

app.use((_req, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);
