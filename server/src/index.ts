import express from "express";
import cors from "cors";

import { env } from "./env";

import { pokemonRoute } from "./modules/pokemon.route";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Hello world!");
});

app.use("/pokemon", pokemonRoute);

app.listen(env.PORT, () =>
  console.log(`Serveur disponible sur http://localhost:${env.PORT}`)
);
