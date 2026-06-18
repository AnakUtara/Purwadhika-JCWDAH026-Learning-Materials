import { Router, type Request, type Response } from "express";
import { APP_NAME } from "../configs/env.config.js";
import todoRouter from "../resources/todo.resource.js";

// apiRouter ini adalah pola umum untuk mengelompokkan semua resource endpoint yang kita punya,
// supaya lebih rapi dan terstruktur, daripada mendaftarkan semua endpoint langsung di app.ts
// yang bisa membuat app.ts jadi sangat panjang dan sulit dibaca jika jumlah endpoint-nya banyak
// Versi advanced-nya apiRouter ini juga biasa dipakai untuk handle versioning pada API,
// misal kita punya versi v1 dan v2 untuk resource todo, maka kita bisa buat todoRouterV1 dan todoRouterV2,
// lalu daftarkan masing-masing ke apiRouter dengan prefix /v1/todos dan /v2/todos
const apiRouter: Router = Router();

apiRouter.get("/", (_req: Request, res: Response) => {
	res.send({ message: `Welcome to the ${APP_NAME}!` });
});

// Setiap resource yang nanti bisa ditambahkan ke apiRouter saja, tidak perlu lagi didaftarkan di app.ts
// Supaya konsisten dengan prefix /api yang sudah didaftarkan di app.ts
// Pola yang sama dengan apiRouter kita bisa lakukan untuk setiap endpoint resource lainnya
// Contoh dengan todoRouter di bawah ini, semua endpoint yang didefinisikan di todoRouter akan memiliki prefix /api/todos
// Sehingga di resources/todo.resource.ts kita bisa mendefinisikan endpoint
// hanya dengan path "/" untuk get all todos,
// dan "/:todoId" untuk get todo by id,
// tanpa perlu menambahkan prefix /api/todos lagi di seluruh http method path-nya
apiRouter.use("/todos", todoRouter);

export default apiRouter;
