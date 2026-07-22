import { Redis } from "ioredis";
import type { ConnectionOptions } from "bullmq";
import { UPSTASH_REDIS_URL } from "../configs/env.config.js";

export const redisConfig: ConnectionOptions = {
	url: UPSTASH_REDIS_URL,
};

const redis = new Redis(UPSTASH_REDIS_URL);

redis.on("connect", () => console.log("🚀 Redis Connected"));
redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;
