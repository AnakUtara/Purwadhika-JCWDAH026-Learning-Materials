import express, { Router } from "express";
import { APP_NAME } from "../configs/env.config.js";
import { authResource } from "../resources/auth.resource.js";

const apiRouter: Router = express.Router();

// * API Welcome Route
apiRouter.get("/", (_, res) => res.send(`Welcome to the ${APP_NAME} API`));

apiRouter.use("/auth", authResource);
apiRouter.use("/health", (_, res) => res.send("OK"));

export default apiRouter;
