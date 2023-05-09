import { z } from "zod";

const client = z.object({
  VITE_API_URL: z.string().url(),
});

const processEnv = {
  VITE_API_URL: import.meta.env.VITE_API_URL,
};

const env = import.meta.env as unknown as z.infer<typeof client>;

const parsed = client.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    "❌ Variables d'environnement invalides :",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Variables d'environnement invalides");
}

export { env };
