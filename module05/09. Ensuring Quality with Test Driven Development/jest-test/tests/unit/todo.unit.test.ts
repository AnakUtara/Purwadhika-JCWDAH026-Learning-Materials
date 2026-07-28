import { jest } from "@jest/globals";
import { mockDeep, mockReset } from "jest-mock-extended";
import type { PrismaClient, Todo } from "../../src/generated/prisma/client.js";
import type { TodoCreateInput } from "../../src/generated/prisma/models.js";

const prismaMock = mockDeep<PrismaClient>();

jest.unstable_mockModule("../../src/libs/prisma.js", () => ({
	__esModule: true,
	prisma: prismaMock,
	default: prismaMock,
}));

const { default: app } = await import("../../src/app.js");
const { default: request } = await import("supertest");

beforeEach(() => {
	mockReset(prismaMock);
});

describe("GET /todos with mocked Prisma", () => {
	it("should return an array of todos", async () => {
		const mockTodos: Todo[] = [
			{
				id: 1,
				title: "Mocked Todo 1",
				completed: false,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 2,
				title: "Mocked Todo 2",
				completed: true,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		];

		prismaMock.todo.findMany.mockResolvedValue(mockTodos);

		const res = await request(app).get("/todos");
		const expectedData = JSON.parse(JSON.stringify(mockTodos));

		const expectedResponse = {
			message: "Todos retrieved successfully",
			data: expectedData,
		};

		expect(res.body).toEqual(expectedResponse);
		expect(prismaMock.todo.findMany).toHaveBeenCalled();
	});

	it("should return one todo by id", async () => {
		const mockTodo: Todo = {
			id: 1,
			title: "Mocked Todo 1",
			completed: false,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		prismaMock.todo.findUnique.mockResolvedValue(mockTodo);

		const res = await request(app).get("/todos/1");
		const expectedData = JSON.parse(JSON.stringify(mockTodo));
		const expectedResponse = {
			message: "Todo retrieved successfully",
			data: expectedData,
		};

		expect(res.body).toEqual(expectedResponse);
		expect(prismaMock.todo.findUnique).toHaveBeenCalledWith({
			where: { id: 1 },
		});
	});
});

describe("POST /todos with mocked Prisma", () => {
	it("should create a new todo", async () => {
		const newTodo: TodoCreateInput = {
			title: "New Mocked Todo",
		};

		prismaMock.todo.create.mockResolvedValue(newTodo as Todo);

		const res = await request(app).post("/todos").send(newTodo);
		const expectedData = JSON.parse(JSON.stringify(newTodo));
		const expectedResponse = {
			message: "Todo created successfully",
			data: expectedData,
		};

		expect(res.statusCode).toEqual(201);
		expect(res.body).toEqual(expectedResponse);
		expect(prismaMock.todo.create).toHaveBeenCalledWith({
			data: newTodo,
		});
	});
});
