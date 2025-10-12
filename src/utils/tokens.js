import jwt from "jsonwebtoken";
import config from "../config/index.js";

export const Tokens = {
	token: (userId) => {
		const token = jwt.sign({ type: "token" }, process.env.JWT_ACCESS_SECRET, {
			subject: userId,
			expiresIn: config.access_token_expire,
		});

		return token;
	},
	refresh_token: (userId) => {
		const refreshToken = jwt.sign(
			{ type: "refresh" },
			process.env.JWT_REFRESH_SECRET,
			{
				subject: userId,
				expiresIn: config.refresh_token_expire,
			},
		);

		return refreshToken;
	},
};
