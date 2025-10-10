import { client } from "../config/database.js";

export const Users = {
	async getAllUsers() {
		return await client.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	},

	async getUserById(id) {
		const user = await client.user.findUnique({ where: { id } });
		if (!user) {
			const error = new Error("User not exists");
			error.status = 400;
			throw error;
		}
		return user;
	},
};
