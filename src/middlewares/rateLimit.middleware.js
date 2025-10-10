import { rateLimit } from "express-rate-limit";

export const RateLimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minuto
	max: 5,
	message: "Muitas requisições. Tente novamente mais tarde.",
});
