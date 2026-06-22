import { Router } from "express";
import { requestBodyValidation } from "../middlewares/request-body-validation.middleware.js";
import {
	createToDoSchema,
	updateToDoSchema,
} from "../validations/todo.schema.js";
import TodoController from "../controllers/todos.controller.js";

const todoRouter: Router = Router();

todoRouter.get("/", TodoController.getAll);
todoRouter.get("/:todoId", TodoController.getById);
todoRouter.post(
	"/",
	requestBodyValidation(createToDoSchema),
	TodoController.create,
);
todoRouter.patch(
	"/:todoId",
	requestBodyValidation(updateToDoSchema),
	TodoController.update,
);
todoRouter.delete("/:todoId", TodoController.delete);

export default todoRouter;
