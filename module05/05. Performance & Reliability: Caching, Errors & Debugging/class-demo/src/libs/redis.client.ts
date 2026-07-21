import { Redis, ReplyError } from "ioredis";
import { UPSTASH_REDIS_URL } from "../configs/env.config.js";

const redis = new Redis(UPSTASH_REDIS_URL);

redis.on("error", (error: unknown) => {
	if (error instanceof ReplyError) {
		console.error("Redis Server Error Code:", error); // e.g., "WRONGTYPE..."
	} else if (error instanceof Error && "code" in error) {
		console.error("Network Error Code:", (error as any).code); // e.g., "ECONNREFUSED"
	} else {
		console.error("Generic Error:", error);
	}
});

export default redis;
