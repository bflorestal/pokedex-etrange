import express from "express";
import cors from "cors";

import { env } from "./env";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.listen(env.PORT ?? 5000, () =>
  console.log(`Serveur disponible sur http://localhost:${env.PORT ?? 5000}`)
);
