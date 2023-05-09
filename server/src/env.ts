import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const server = z.object({
  PORT: z.number().int().positive().optional(),
});

const processEnv = {
  PORT: Number(process.env.PORT) || 5000,
};

const env = process.env as unknown as z.infer<typeof server>;

const parsed = server.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Variables d'environnement invalides :",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Variables d'environnement invalides");
}

export { env };
