import request from "supertest";
import app from "../../src/app.js";

describe("GET /todos", () => {
	it("should return an array of todos", async () => {
		const res = await request(app).get("/todos");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toEqual({
			message: "Todos retrieved successfully",
			data: expect.arrayOf(
				expect.objectContaining({
					id: expect.any(Number),
					title: expect.any(String),
					completed: expect.any(Boolean),
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				}),
			),
		});
	});

	it("should return one todo by id", async () => {
		const res = await request(app).get("/todos/1");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({
			message: "Todo retrieved successfully",
			data: expect.objectContaining({
				id: expect.any(Number),
				title: expect.any(String),
				completed: expect.any(Boolean),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			}),
		});
	});

	it("should return 404 for non-existing todo", async () => {
		const res = await request(app).get("/todos/999");
		expect(res.statusCode).toBe(404);
		expect(res.body).toEqual({
			message: "Todo not found",
		});
	});
});

describe("POST /todos", () => {
	it("should create a new todo", async () => {
		const newTodo = {
			title: "New Todo 3 Test Jest",
			completed: false,
		};
		const res = await request(app).post("/todos").send(newTodo);
		expect(res.statusCode).toEqual(201);
		expect(res.body).toEqual({
			message: "Todo created successfully",
			data: expect.objectContaining({
				id: expect.any(Number),
				title: newTodo.title,
				completed: newTodo.completed,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			}),
		});
	});
});
