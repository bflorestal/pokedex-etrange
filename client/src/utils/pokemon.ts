import { PokemonWithId } from "../../../server/src/modules/pokemon.schema";
import { env } from "../env";

export async function getAllPokemon() {
  try {
    const res = await fetch(`${env.VITE_API_URL}/pokemon`);
    const data = await res.json();

    return data as PokemonWithId[];
  } catch (err) {
    console.error(err);

    return [];
  }
}

export async function getPokemonById(id: number) {
  try {
    const res = await fetch(`${env.VITE_API_URL}/pokemon/${id}`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}
