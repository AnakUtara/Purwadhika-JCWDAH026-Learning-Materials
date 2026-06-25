import { Router } from "express";
import PostsController from "../controllers/posts.controller.js";
import { requestBodyValidation } from "../middlewares/request-body-validation.middleware.js";
import {
	createPostSchema,
	updatePostSchema,
} from "../validations/post.schema.js";

const postsResource = Router();

postsResource.get("/", PostsController.getAll);
postsResource.get("/:id", PostsController.getById);
postsResource.post(
	"/",
	requestBodyValidation(createPostSchema),
	PostsController.create,
);
// postsResource.patch("/:id"); // soft delete/restore data
postsResource.put(
	"/:id",
	requestBodyValidation(updatePostSchema),
	PostsController.update,
); // update data
postsResource.delete("/:id", PostsController.delete); // hard delete

export default postsResource;
