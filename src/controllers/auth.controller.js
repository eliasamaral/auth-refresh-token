import { validate } from "../middlewares/validate.middleware.js";
import { Auth } from "../services/auth.services.js";
import {
	UserSchema,
	LoginSchema,
	RefreshTokenSchema,
} from "../utils/schemas.js";

export const AuthController = {
	async login(req, res) {
		try {
			validate(req, LoginSchema);

			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(400).json({
					status: "error",
					message: "Email and password are required",
				});
			}

			const tokens = await Auth.login({ email, password });

			return res.status(200).json({ status: "success", data: tokens });
		} catch (err) {
			if (err.status === 400) {
				return res.status(400).json({
					status: "error",
					message: err.message,
					errors: err.details,
				});
			}

			res.status(500).json({
				status: "error",
				message: err.message || "Internal Server Error",
			});
		}
	},

	async register(req, res) {
		try {
			validate(req, UserSchema);

			const { name, email, password, role } = req.body;

			const user = await Auth.register({ name, email, password, role });
			res.status(201).json({ status: "success", data: user.id });
		} catch (err) {
			if (err.status === 400) {
				return res.status(400).json({
					status: "error",
					message: err.message,
					errors: err.details,
				});
			}

			res.status(500).json({
				status: "error",
				message: err.message || "Internal Server Error",
			});
		}
	},

	async refresh(req, res) {
		try {
			validate(req, RefreshTokenSchema);

			const { refresh_token } = req.body;

			const refreshToken = await Auth.refresh(refresh_token);

			return res.status(200).json(refreshToken);
		} catch (err) {
			return res.status(err.status || 500).json({
				status: "error",
				message: err.message || "Internal Server Error",
			});
		}
	},
};
