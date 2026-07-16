import express, { Router } from "express";
import { appName } from "../config/env.config.js";
import { cloudinaryStorageRouter } from "../resources/cloudinary-storage.resource.js";
import { processorRouter } from "../resources/processor.resource.js";

const apiRouter: Router = express.Router();

// * API Welcome Route
apiRouter.get("/", (_, res) => res.send(`Welcome to the ${appName}'s API!`));

apiRouter.use("/processor", processorRouter);
apiRouter.use("/storage", cloudinaryStorageRouter);
apiRouter.use("/health", (_, res) => res.send("OK"));

export default apiRouter;
