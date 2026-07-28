import { Router } from "express";
import todosController from "../controllers/todos.controller.js";

const todosRouter = Router();

todosRouter.get("/", todosController.getAll);
todosRouter.post("/", todosController.create);
todosRouter.get("/:id", todosController.getById);
todosRouter.put("/:id", todosController.update);
todosRouter.delete("/:id", todosController.delete);

export default todosRouter;
