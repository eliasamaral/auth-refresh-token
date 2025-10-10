import { Users } from "../services/users.services.js";

export const UsersController = {
	async getAllUsers(_, res, next) {
		try {

			const users = await Users.getAllUsers();
			res.status(200).json({ status: "success", data: users });
		} catch (err) {
			next(err);
		}
	},

	async getUserById(req, res) {
		try {
			const id = req.params.id;
			if (!id) {
				return res.status(400).json({
					status: "error",
					message: "User ID is required",
				});
			}

			const user = await Users.getUserById(req.params.id);
			res.status(200).json({ status: "success", data: user });
		} catch (err) {
			res.status(err.status || 500).json({
				status: "error",
				message: err.message || "Internal Server Error",
			});
		}
	},
};
