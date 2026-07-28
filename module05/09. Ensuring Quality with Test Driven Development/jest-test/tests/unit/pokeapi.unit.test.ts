import request from "supertest";
import app from "../../src/app.js";
import nock from "nock";

describe("GET /pokemons", () => {
	it("should return an array of pokemons", async () => {
		const mockPokemons = {
			results: [
				{
					name: "bulbasaur",
					url: "https://pokeapi.co/api/v2/pokemon/1/",
				},
				{
					name: "ivysaur",
					url: "https://pokeapi.co/api/v2/pokemon/2/",
				},
				{
					name: "venusaur",
					url: "https://pokeapi.co/api/v2/pokemon/3/",
				},
			],
		};

		nock("https://pokeapi.co").get("/api/v2/pokemon").reply(200, mockPokemons);

		const res = await request(app).get("/pokemons");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Get all pokemons",
			data: mockPokemons.results,
		});
	});

	it("should return a single pokemon by name", async () => {
		const mockPokemon = {
			abilities: [
				{
					ability: {
						name: "limber",
						url: "https://pokeapi.co/api/v2/ability/7/",
					},
					is_hidden: false,
					slot: 1,
				},
				{
					ability: {
						name: "imposter",
						url: "https://pokeapi.co/api/v2/ability/150/",
					},
					is_hidden: true,
					slot: 3,
				},
			],
			species: {
				name: "ditto",
				url: "https://pokeapi.co/api/v2/pokemon-species/132/",
			},
		};

		nock("https://pokeapi.co")
			.get("/api/v2/pokemon/ditto")
			.reply(200, mockPokemon);

		const res = await request(app).get("/pokemons/ditto");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Get pokemon ditto",
			data: mockPokemon,
		});
	});

	it("should return 404 for non-existing pokemon", async () => {
		nock("https://pokeapi.co")
			.get("/api/v2/pokemon/nonexistentpokemon")
			.reply(404);

		const res = await request(app).get("/pokemons/nonexistentpokemon");
		expect(res.statusCode).toEqual(404);
		expect(res.body).toEqual({
			message: "Pokemon not found",
		});
	});
});
