import jwt from "jsonwebtoken";
import auth from "../config/auth.js";

export const Tokens = {
	token: (userId) => {
		const token = jwt.sign({ type: "token" }, process.env.JWT_ACCESS_SECRET, {
			subject: userId,
			expiresIn: auth.access_token_expire,
		});

		return token;
	},
	refresh_token: (userId) => {
		const refreshToken = jwt.sign(
			{ type: "refresh" },
			process.env.JWT_REFRESH_SECRET,
			{
				subject: userId,
				expiresIn: auth.refresh_token_expire,
			},
		);

		return refreshToken;
	},
};
