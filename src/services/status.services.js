import { client } from "../config/database.js";

export const Status = {
	getStatus: async (_, res, next) => {
		try {
			const dbInfo = await client.$queryRaw`
              SELECT current_database() AS database, version() AS version, NOW() AS now
            `;

			const totalConnections = await client.$queryRaw`
              SELECT COUNT(*)::int AS total
              FROM pg_stat_activity
              WHERE datname = current_database()
            `;

			const connectionsByUserState = await client.$queryRaw`
              SELECT usename AS user, state, COUNT(*)::int AS count
              FROM pg_stat_activity
              WHERE datname = current_database()
              GROUP BY usename, state
              ORDER BY usename, state
            `;

			res.json({
				status: "ok",
				database: dbInfo[0].database,
				version: dbInfo[0].version,
				now: dbInfo[0].now,
				connections: {
					total: totalConnections[0].total,
					byUserState: connectionsByUserState,
				},
				uptime: process.uptime(),
			});
		} catch (err) {
			next(err);
		}
	},
};
