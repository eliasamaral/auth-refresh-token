import argon2 from "argon2";
import { client } from "../config/database.js";

async function main() {
	console.log("🌱 Iniciando seed...");

	const admin = await client.user.create({
		data: {
			name: "Elias Amaral",
			email: "elias@example.com",
			password: await argon2.hash("@Elias1998"),
			role: "ADMIN",
		},
	});

	const user1 = await client.user.create({
		data: {
			name: "Samuel Amaral",
			email: "samuel@example.com",
			password: await argon2.hash("@Samuel1998"),
			role: "USER",
		},
	});

	const user2 = await client.user.create({
		data: {
			name: "Miguel Amaral",
			email: "miguel@example.com",
			password: await argon2.hash("@Miguel1998"),
			role: "USER",
		},
	});

	console.log("✅ Seed concluído com sucesso!");
	console.log({ admin, user1, user2 });
}

main()
	.catch((e) => {
		console.error("❌ Erro no seed:", e);
		process.exit(1);
	})
	.finally(async () => {
		await client.$disconnect();
	});
