import { z } from "zod";

// Types de Pokémon
export const pokemonTypes = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
] as const;

export const TypeEnum = z.enum(pokemonTypes);

export type PokemonType = z.infer<typeof TypeEnum>;

// Schemas de Pokémon

export const PokemonSchema = z.object({
  name: z.object({
    english: z.string().min(1).max(70),
    japanese: z.string().min(1).max(70).optional(),
    chinese: z.string().min(1).max(70).optional(),
    french: z.string().min(1).max(70),
  }),
  type: z.array(TypeEnum).min(1).max(2),
  base: z.object({
    HP: z.number().int().positive(),
    Attack: z.number().int().positive(),
    Defense: z.number().int().positive(),
    "Sp. Attack": z.number().int().positive(),
    "Sp. Defense": z.number().int().positive(),
    Speed: z.number().int().positive(),
  }),
});

export const PokemonSchemaWithId = PokemonSchema.extend({
  id: z.number().int().positive(),
});

export type PokemonWithId = z.infer<typeof PokemonSchemaWithId>;
export type Pokemon = z.infer<typeof PokemonSchema>;
