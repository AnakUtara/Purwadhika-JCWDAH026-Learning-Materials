import type { User } from "../generated/prisma/client.ts";

declare module "express-serve-static-core" {
	interface Request {
		user?: User;
	}
}
