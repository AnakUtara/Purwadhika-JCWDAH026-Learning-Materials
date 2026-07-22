import type { Server, Socket } from "socket.io";
import { chatMessageSchema } from "../validations/chat-message.schema.js";
import type { SocketResponse } from "../types/socket-response.interface.js";

interface IChatMessage {
	sender: string;
	content: string;
	timestamp: string;
}

const registerChatHandler = (io: Server, socket: Socket) => {
	socket.on(
		"message-sent",
		(data: IChatMessage, cb: (response: SocketResponse) => void) => {
			const validMessage = chatMessageSchema.safeParse(data);

			if (!validMessage.success) {
				return cb({
					status: "error",
					message: "Invalid message format",
					errors: validMessage.error.issues,
				});
			}

			io.emit("message-received", { id: socket.id, ...data });
			cb({ status: "ok" });
		},
	);
};

export { registerChatHandler };
