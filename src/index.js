import { apiReference } from "@scalar/express-api-reference";
import express from "express";
import { client } from "./config/database.js";
import { router } from "./routes.js";
import OpenApiSpecification from "../docs/openApiSpecification.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", router);
app.use(
	"/openapi",
	apiReference({
		theme: "deepSpace",
		spec: { content: OpenApiSpecification },
	}),
);
app.use((_, res) => {
	res.status(404).json({
		status: "error",
		message: "Route not found",
	});
});
app.use((err, _, res, __) => {
	console.error(err.stack ?? err);
	res.status(500).json({
		status: "error",
		message: err.message ?? "Internal Server Error",
	});
});

async function server() {
	try {
		await client.$connect();
		console.log("Conectado ao banco ✅");

		const serverInstance = app.listen(port, () => {
			console.log(`API rodando em http://localhost:${port}`);
			console.log(`Documentação em http://localhost:${port}/openapi`);
		});

		const shutdown = async () => {
			console.log("Shutting down...");
			serverInstance.close();
			try {
				await client.$disconnect();
				console.log("Banco desconectado ✅");
			} catch (e) {
				console.error("Erro ao desconectar o banco:", e);
			}
			process.exit(0);
		};

		process.on("SIGINT", shutdown);
		process.on("SIGTERM", shutdown);
	} catch (err) {
		console.error("Erro ao conectar no banco ❌", err.message ?? err);
		process.exit(1);
	}
}

server();
