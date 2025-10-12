import { rateLimit } from "express-rate-limit";
import config from "../config/index.js";

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minuto
	max: 5,
	message: "Muitas requisições. Tente novamente mais tarde.",
	standardHeaders: true,
	legacyHeaders: false,
});

export const RateLimiter = config.rate_limit
	? limiter
	: (_req, _res, next) => next();

