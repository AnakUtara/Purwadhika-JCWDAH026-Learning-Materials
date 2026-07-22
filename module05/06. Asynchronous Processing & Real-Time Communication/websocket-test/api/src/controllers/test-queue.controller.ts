import type { Request, Response } from "express";
import { testQueue } from "../queues/queue.manager.js";
import { getIO } from "../configs/socket.config.js";

class TestQueueController {
	async addToQueue(req: Request, res: Response) {
		const { email } = req.body;
		if (!email) {
			return res.status(400).json({ error: "Email is required" });
		}

		// A queue can have multiple jobs
		// Job names can be the same or different, but jobId should be unique to prevent duplicates
		// Job name and id can be accessed via Worker's job.name and job.id respectively
		testQueue.add("sendEmail", { email }, { jobId: email }); // Use email as jobId to prevent duplicates

		getIO().emit(
			"queue-update",
			{ message: `New job added for ${email}` },
			() => {
				console.log("listener emit queue-update: New job added for ", email);
			},
		); // Emit a message to all connected clients
		return res.status(202).send({ message: `${email} added to the queue` });
	}
}

export default new TestQueueController();
