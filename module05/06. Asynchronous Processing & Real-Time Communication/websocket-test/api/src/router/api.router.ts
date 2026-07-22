import { Router } from "express";
import testQueueController from "../controllers/test-queue.controller.js";

const apiRouter = Router();

apiRouter.post("/test-queue", testQueueController.addToQueue);

export default apiRouter;
