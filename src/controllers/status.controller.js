import { Status } from "../services/status.services.js";

export const StatusController = {
	getStatus: async (req, res, next) => {
		await Status.getStatus(req, res, next);
	},
};
