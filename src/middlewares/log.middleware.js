import config from "../config/index.js";

export const Logs = (req, res, next) => {
	if (!config.enable_logs) {
		return next();
	}

	const start = Date.now();

	res.on("finish", () => {
		const duration = Date.now() - start;
		console.log(
			`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} - ${duration}ms`,
		);
	});

	next();
};
