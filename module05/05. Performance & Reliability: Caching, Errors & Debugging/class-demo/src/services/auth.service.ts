import { compare, genSalt, hash } from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";

const AuthService = {
	hashPassword: async (password: string): Promise<string> => {
		const salt = await genSalt(12);
		return await hash(password, salt);
	},

	comparePassword: async (
		password: string,
		hashedPassword: string,
	): Promise<boolean> => {
		return await compare(password, hashedPassword);
	},

	verifyToken: (token: string, secret: string) => {
		return jwt.verify(token, secret);
	},

	generateToken: (payload: object, secret: string, expiresIn: string) => {
		return jwt.sign(payload, secret, { expiresIn } as SignOptions);
	},
};

export default AuthService;
