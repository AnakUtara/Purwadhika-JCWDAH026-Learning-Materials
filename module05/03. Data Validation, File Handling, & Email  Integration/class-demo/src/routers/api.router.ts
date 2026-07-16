import express, { Router } from "express";
import { APP_NAME } from "../config/env.config.js";
import cloudinaryStorageResource from "../resources/cloudinary-storage.resource.js";

const apiRouter: Router = express.Router();

// * API Welcome Route
apiRouter.get("/", (_, res) => res.send(`Welcome to the ${APP_NAME}'s API!`));

apiRouter.use("/storage", cloudinaryStorageResource);

export default apiRouter;
