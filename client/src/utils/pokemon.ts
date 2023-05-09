// Import des types et schemas définis dans le serveur
import type {
  Pokemon,
  PokemonWithId,
} from "../../../server/src/modules/pokemon.schema";
import { env } from "../env";

const API_URL = env.VITE_API_URL;

export async function getAllPokemon() {
  try {
    const res = await fetch(`${API_URL}/pokemon`);
    const data = await res.json();

    return data as PokemonWithId[];
  } catch (err) {
    console.error(err);

    return [];
  }
}

export async function getPokemonById(id: number) {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`);
    const data = await res.json();

    return data as PokemonWithId;
  } catch (err) {
    console.error(err);

    return null;
  }
}

export async function createPokemon(pokemon: Pokemon) {
  try {
    const res = await fetch(`${API_URL}/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function updatePokemon(id: number, pokemon: Pokemon) {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pokemon),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePokemon(id: number) {
  try {
    const res = await fetch(`${API_URL}/pokemon/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
