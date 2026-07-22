import { Worker } from "bullmq";
import testJob from "../queues/jobs/test.job.js";
import { redisConfig } from "../libs/redis.js";
import logger from "../utils/logger.js";
import { IS_PRODUCTION } from "../configs/env.config.js";

// Kalau tidak ada worker, queue akan nyangkut di redis,
// karena tidak ada yang memproses job yang ada di queue.

const testWorker = new Worker(
	"test-queue", // Pastikan setiap worker mendengarkan queue yang sama dengan yang dibuat di queue.manager.ts atau file2 *.queue.ts
	async (job) => {
		// job object ini datang dari queue saat queue.add dipanggil.
		// data yang dikirim ke queue akan diterima di job.data.
		switch (job.name) {
			case "sendEmail":
				const { email } = job.data;

				// Panggil job function yang sudah dibuat di test.job.ts
				// Perhatikan kalau ini hanya layering saja, untuk mengikuti kaidah
				// clean architecture, service layer, dll.
				// Bisa juga langsung panggil service di sini. Misal memang hanya butuh 1 service saja.
				// Kalau service layernya yang dipanggil banyak, lebih baik dipanggil di job functionnya saja,
				// biar rapih & mudah debug-nya.
				await testJob({ email });

				break;
			default:
				console.warn(`Unknown job name: ${job.name}`);
		}
	},
	{ connection: redisConfig },
);

testWorker.on("active", (job) => {
	console.log(`🏃 Job ${job.id} has started processing...`);
});

testWorker.on("completed", (job) => {
	console.log(`✅ Job ${job.id} is finished!`);
});

testWorker.on("failed", (job, err) => {
	logger.error(`❌ Job ${job?.id} failed: ${err.message}`, {
		jobId: job?.id,
		error: err,
	});
	console.log(`❌ Job ${job?.id} failed: ${err.message}`);
});

export default testWorker;
