import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { CLIENT_ORIGIN } from "./env.config.js";
import { registerChatHandler } from "../sockets/chat.socket.js";

let io: Server;

export const getIO = () => {
	if (!io) throw new Error("Socket.io not initialized");
	return io;
};

const configureSocket = (server: HttpServer) => {
	io = new Server(server, {
		cors: {
			origin: CLIENT_ORIGIN,
			credentials: true,
		},
	});

	io.on("connection", (socket) => {
		console.log("A client connected: " + socket.id);

		registerChatHandler(io, socket);

		socket.on("disconnect", () => {
			console.log("A client disconnected: " + socket.id);
		});
	});

	return { io };
};

export default configureSocket;
