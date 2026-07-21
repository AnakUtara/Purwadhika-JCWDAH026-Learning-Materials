import { Router } from "express";
import postController from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.get("/", postController.getAll);
postRouter.get("/:id", postController.getById);

export default postRouter;
