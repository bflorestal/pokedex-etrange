import { Router } from "express";

import {
  getAllPokemon,
  getPokemonById,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "./pokemon.controller";

const router = Router();

router.get("/", getAllPokemon);
router.get("/:id", getPokemonById);
router.post("/", createPokemon);
router.put("/:id", updatePokemon);
router.delete("/:id", deletePokemon);

export { router as pokemonRoute };
