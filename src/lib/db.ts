import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    // Validate required env variables (port falls back to 3306)
    const host = process.env.MYSQL_HOST;
    const user = process.env.MYSQL_USER;
    const password = process.env.MYSQL_PASSWORD;
    const database = process.env.MYSQL_DATABASE;
    const port = Number(process.env.MYSQL_PORT || 3306);

    if (!host || !user || !database) {
      console.warn(
        "MySQL database credentials missing in environment variables. Database operations will fail."
      );
    }

    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function query(sql: string, values?: any[]) {
  const dbPool = getDbPool();
  try {
    const [results] = await dbPool.execute(sql, values);
    return results;
  } catch (err) {
    console.error("Database query execution error:", err);
    throw err;
  }
}
