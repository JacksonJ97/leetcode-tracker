import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/config/env";
import { relations } from "@/db/relations";

const pool = new Pool({ connectionString: env.DATABASE_URL });

export const db = drizzle({ relations, client: pool });
