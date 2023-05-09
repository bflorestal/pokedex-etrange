import { Request, Response } from "express";
import fs from "fs";
import path from "path";

import pokedex from "../data/pokedex.json";

export const getAllPokemon = (_req: Request, res: Response) => {
  return res.status(200).json(pokedex);
};

export const getPokemonById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pokemon = pokedex.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: "Pokémon introuvable." });
  }

  return res.status(200).json(pokemon);
};

export const createPokemon = (req: Request, res: Response) => {
  const pokemon = req.body;

  if (!pokemon) {
    return res.status(400).json({ message: "Aucun Pokémon n'a été envoyé." });
  }

  // TODO: Vérifier que le Pokémon n'existe pas déjà

  // TODO: Vérifier que le Pokémon a bien toutes les propriétés requises

  const newPokemon = { ...pokemon, id: pokedex.length + 1 };
  pokedex.push(newPokemon);

  fs.writeFileSync(
    path.join(__dirname, "../data/pokedex.json"),
    JSON.stringify(pokedex)
  );

  return res.status(201).json(newPokemon);
};

export const updatePokemon = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pokemon = pokedex.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: "Pokémon introuvable." });
  }

  // TODO: Vérifier que les données envoyées sont valides

  const updatedPokemon = { ...pokemon, ...req.body };
  const index = pokedex.indexOf(pokemon);
  pokedex[index] = updatedPokemon;

  fs.writeFileSync(
    path.join(__dirname, "../data/pokedex.json"),
    JSON.stringify(pokedex)
  );

  return res.status(200).json(updatedPokemon);
};

export const deletePokemon = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const pokemon = pokedex.find((pokemon) => pokemon.id === id);

  if (!pokemon) {
    return res.status(404).json({ message: "Pokémon introuvable." });
  }

  const index = pokedex.indexOf(pokemon);
  pokedex.splice(index, 1);

  fs.writeFileSync(
    path.join(__dirname, "../data/pokedex.json"),
    JSON.stringify(pokedex)
  );

  return res.status(200).json({ message: `Pokémon #${id} supprimé.` });
};
