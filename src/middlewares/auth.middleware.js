import jwt from "jsonwebtoken";

export const AuthMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res
			.status(401)
			.json({ status: "error", message: "Token is missing" });
	}

	const [, token] = authHeader.split(" ");

	try {
		const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

		req.userId = payload.sub;

		next();
	} catch (err) {
		return res
			.status(err.status || 401)
			.json({ status: "error", message: "Invalid or expired token" });
	}
};
