import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

// Pour avoir l'autocomplétion sur les variables d'environnement
const server = z.object({
  PORT: z.number().int().positive().optional(),
});

const processEnv = {
  PORT: Number(process.env.PORT) || 5000,
};

const env = process.env as unknown as z.infer<typeof server>;

// Vérification des variables d'environnement (PORT optionnel dans le cadre de ce TP)
const parsed = server.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Variables d'environnement invalides :",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Variables d'environnement invalides");
}

export { env };
