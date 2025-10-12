import { Router } from "express";
import { AuthController } from "./controllers/auth.controller.js";
import { StatusController } from "./controllers/status.controller.js";
import { UsersController } from "./controllers/users.controller.js";
import { AuthMiddleware } from "./middlewares/auth.middleware.js";
import { RateLimiter } from "./middlewares/rateLimit.middleware.js";
import { Logs } from "./middlewares/log.middleware.js";

const router = Router();

router.use(Logs, RateLimiter);

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh-token", AuthController.refresh);

router.get("/status", StatusController.getStatus);

router.get("/users", AuthMiddleware, UsersController.getAllUsers);
router.get("/users/:id", AuthMiddleware, UsersController.getUserById);

export { router };
