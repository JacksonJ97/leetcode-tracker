import { authRelations } from "@/db/schemas/auth-schema";

export const relations = {
  // Auth relations needs to be last
  ...authRelations,
};
