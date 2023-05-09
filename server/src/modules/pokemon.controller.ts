import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import pokedex from "../data/pokedex.json";

export const getAllPokemon = (_req: Request, res: Response) => {
  res.status(200).json(pokedex);
};

export const getPokemonById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pokemon = pokedex.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
    res.status(404).json({ message: "Pokémon introuvable." });
  }

  res.status(200).json(pokemon);
};

export const createPokemon = (req: Request, res: Response) => {};

export const updatePokemon = (req: Request, res: Response) => {};

export const deletePokemon = (req: Request, res: Response) => {};
