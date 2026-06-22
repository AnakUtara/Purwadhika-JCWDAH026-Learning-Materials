import express from "express";
import type { Application, NextFunction, Request, Response } from "express";
import { APP_PORT } from "./src/configs/env.config.js";
import apiRouter from "./src/routes/api.route.js";
import Yup from "./src/libs/yup.js";
import pg from "./src/libs/db.js";
import type { PoolClient } from "pg";

// File app.ts harus ada di root folder sebagai entry point aplikasi
// app.ts hanya akan mengurus hal-hal yang bersifat global untuk seluruh aplikasi, seperti:
// - setup server dan middleware yang bersifat global (contoh: body parser, cors, dll)
// - register router untuk setiap resource endpoint yang kita punya (contoh: todoRouter, userRouter, dll)
// - atau register router untuk grouping endpoint dengan prefix tertentu (contoh: apiRouter dengan prefix /api)
// - error handling untuk seluruh aplikasi (contoh: 404 not found, 500 internal server error, dll)
// Sedangkan untuk hal-hal yang bersifat spesifik untuk tiap resource endpoint, seperti:
// - definisi schema validasi request body untuk tiap endpoint resource
// - definisi service function untuk operasi CRUD pada resource tertentu
// - definisi route handler untuk tiap endpoint resource
// akan didefinisikan di file terpisah sesuai dengan resource-nya masing-masing
// Contoh untuk resource "todo", kita bisa buat folder src/resources/todo.resource.ts untuk mendefinisikan route handler-nya,
// src/services/todo.service.ts untuk mendefinisikan service function-nya,
// src/validations/todo.schema.ts untuk mendefinisikan schema validasi request body-nya,
// dan src/models/todo.model.ts untuk mendefinisikan tipe data todo item-nya

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register router untuk endpoint /api
// Semua route yang didefinisikan di apiRouter akan memiliki prefix /api,
// misal endpoint untuk todoRouter yang didefinisikan di apiRouter adalah /todos,
// maka endpoint lengkapnya akan menjadi /api/todos
app.use("/api", apiRouter);

pg.connect(
	(
		err: Error | undefined,
		_client: PoolClient | undefined,
		release: () => void,
	) => {
		if (err) {
			console.error("Error acquiring client", err.stack);
			return;
		}

		console.log("Database connection successful!");
		release();
	},
);

// Handle 404 errors untuk endpoint yang tidak ditemukan
// Tidak pakai path karena ini akan menangani semua request yang tidak match dengan route sebelumnya
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
		next: NextFunction,
	) => {
		if (error instanceof Yup.ValidationError) {
			res.status(400).send({
				message: "Validasi request body gagal",
				error: error.errors,
			});
			return;
		}

		res.status(500).send({
			message: "Terjadi error pada server",
			error: error instanceof Error ? error.message : error,
		});
	},
);

app.listen(APP_PORT, () => {
	console.log(`Server is running on port ${APP_PORT}`);
});
