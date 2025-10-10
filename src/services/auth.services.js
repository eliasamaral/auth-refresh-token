import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { client } from "../config/database.js";
import { Tokens } from "../utils/tokens.js";

export const Auth = {
	async login({ email, password }) {
		const userAlreadyExists = await client.user.findFirst({ where: { email } });

		if (!userAlreadyExists) {
			const error = new Error("Credenciais inválidas");
			error.status = 401;
			throw error;
		}

		const user = userAlreadyExists;

		const match = await argon2.verify(user.password, password);
		if (!match) {
			const error = new Error("Credenciais inválidas");
			error.status = 401;
			throw error;
		}
		const token = Tokens.token(user.id);

		const refreshToken = Tokens.refresh_token(user.id);

		await client.refreshToken.create({
			data: { token: refreshToken, userId: user.id },
		});

		return { token, refreshToken };
	},

	async register({ name, email, password, role }) {
		const userAlreadyExists = await client.user.findUnique({
			where: { email },
		});
		if (userAlreadyExists) {
			const error = new Error("User already exists");
			error.status = 400;
			throw error;
		}
		const hashedPassword = await argon2.hash(password);
		const user = await client.user.create({
			data: { name, email, password: hashedPassword, role },
		});
		return user;
	},

	async refresh(refresh_token) {
		const { sub } = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

		const userId = sub;

		const refreshTokenExists = await client.refreshToken.findFirst({
			where: { token: refresh_token, userId },
		});

		if (!refreshTokenExists) {
			const error = new Error("Refresh not found");
			error.status = 401;
			throw error;
		}

		await client.refreshToken.deleteMany({ where: { userId } });

		const newToken = Tokens.token(userId);

		const newRefreshToken = Tokens.refresh_token(userId);

		await client.refreshToken.create({
			data: { token: newRefreshToken, userId },
		});

		return { token: newToken, refreshToken: newRefreshToken };
	},
};



