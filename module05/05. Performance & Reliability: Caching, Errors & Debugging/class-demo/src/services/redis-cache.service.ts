import redis from "../libs/redis.client.js";

class RedisCacheService {
	private client: typeof redis = redis;
	set = async (
		key: string,
		value: any,
		ttlInSeconds?: number,
	): Promise<"OK"> => {
		if (!ttlInSeconds) {
			return this.client.set(
				key,
				JSON.stringify(value),
				"EX",
				3600, // default TTL is 1 hour
			);
		} else {
			return this.client.setex(key, ttlInSeconds, JSON.stringify(value));
		}
	};

	get = async (key: string): Promise<string | null> => {
		return this.client.get(key);
	};

	delete = async (key: string): Promise<number> => {
		return this.client.del(key);
	};
}

export default new RedisCacheService();
