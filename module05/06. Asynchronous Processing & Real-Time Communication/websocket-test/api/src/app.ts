import express from "express";
import type { Application } from "express";
import { createServer } from "http";
import { APP_PORT } from "./configs/env.config.js";
import configureApp from "./configs/app.config.js";
import configureSocket from "./configs/socket.config.js";
import errorHandler, {
	routeNotFoundHandler,
} from "./middlewares/error-handler.middleware.js";
import apiRouter from "./router/api.router.js";
// tsx auto baca file worker yang di-import di bawah ini.
// Kalau worker-nya banyak, bisa buat file index.ts di folder workers,
// lalu import semua worker di index.ts,
// baru import index.ts di app.ts. Jadi lebih rapih.
import "./workers/test.worker.js";
import cronRunner from "./cron/runner.js";

const app: Application = express();
const httpServer = createServer(app);

configureApp(app);
configureSocket(httpServer);

cronRunner();

app.use("/api", apiRouter);

app.use(routeNotFoundHandler);

app.use(errorHandler);

httpServer.listen(APP_PORT, () => {
	console.log(`Server is running on port ${APP_PORT}`);
});

export default app;
