import { Router, type Request, type Response } from "express";

const pokemonRouter = Router();

pokemonRouter.get("/", async (_req, res) => {
	try {
		const response = await fetch("https://pokeapi.co/api/v2/pokemon");
		const data = await response.json();

		res.send({ message: "Get all pokemons", data: data.results });
	} catch (error) {
		console.error("Error fetching pokemons:", error);
		res.status(500).send({ message: "Failed to fetch pokemons" });
	}
});

pokemonRouter.get("/:name", async (req: Request, res: Response) => {
	const { name } = req.params;
	try {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

		if (!response.ok) {
			return res.status(404).send({ message: "Pokemon not found" });
		}

		const pokemonData = await response.json();

		res.send({ message: `Get pokemon ${name}`, data: pokemonData });
	} catch (error) {
		console.error("Error fetching pokemon:", error);
		res.status(500).send({ message: "Failed to fetch pokemon" });
	}
});

export default pokemonRouter;
