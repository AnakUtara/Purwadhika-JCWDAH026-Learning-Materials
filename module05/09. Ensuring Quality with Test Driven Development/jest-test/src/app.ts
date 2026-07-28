import express from "express";
import type { Application } from "express";
import errorHandler, {
	routeNotFoundHandler,
} from "./middlewares/error-handler.middleware.js";
import todosRouter from "./resources/todos.resource.js";
import pokemonRouter from "./resources/pokemon.resource.js";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todosRouter);
app.use("/pokemons", pokemonRouter);

app.use(routeNotFoundHandler);

app.use(errorHandler);

export default app;
