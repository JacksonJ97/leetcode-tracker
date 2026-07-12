import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config/env";

const pool = new Pool({ max: 5, connectionString: env.DATABASE_URL });

export const db = drizzle({ client: pool });
