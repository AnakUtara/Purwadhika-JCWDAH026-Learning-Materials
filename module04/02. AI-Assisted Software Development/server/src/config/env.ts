import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
	PORT: z.coerce.number().default(8000),
	DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
	DIRECT_URL: z.string().min(1, "DIRECT_URL is required"),
});

export const env = envSchema.parse(process.env);
