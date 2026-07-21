import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });
async function main() {
	// Generate 20 posts for user id 1
	const postsUser1 = Array.from({ length: 20 }, (_, i) => ({
		title: `Post ${i + 1} by User 1`,
		content: `This is the content for post ${i + 1} created by user 1.`,
		published: i % 2 === 0, // Alternate between true and false
		authorId: 1,
		thumbnailUrl: `https://example.com/thumbnail-${i + 1}.jpg`,
	}));

	// Generate 20 posts for user id 2
	const postsUser2 = Array.from({ length: 20 }, (_, i) => ({
		title: `Post ${i + 1} by User 2`,
		content: `This is the content for post ${i + 1} created by user 2.`,
		published: i % 2 === 0,
		authorId: 2,
		thumbnailUrl: `https://example.com/thumbnail-user2-${i + 1}.jpg`,
	}));

	// Create posts
	await prisma.post.createMany({
		data: [...postsUser1, ...postsUser2],
	});

	console.log("✅ Seeded 40 posts (20 for user 1, 20 for user 2)");
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
