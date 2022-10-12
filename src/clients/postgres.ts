import { Client } from "pg";

export const pgClientSetup = (): Client => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    database: "postgres_elastic",
    password: "postgres_elastic",
    user: "postgres",
    connectionTimeoutMillis: 5000
  });

  return client;
}
