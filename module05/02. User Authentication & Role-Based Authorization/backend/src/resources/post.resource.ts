import { Router } from "express";
import postController from "../controllers/post.controller.js";
import { verifyAuthToken } from "../middlewares/token.middleware.js";

export const postsResource = Router();

postsResource.get("/", postController.publicList);
postsResource.get("/me", verifyAuthToken("access"), postController.authorList);

postsResource.get("/:id", postController.show);

postsResource.use(verifyAuthToken("access"));

postsResource.post("/", postController.create);
postsResource.put("/:id", postController.update);
postsResource.delete("/:id", postController.delete);
