import { z } from "zod";

const Pokemon = z.object({
  name: z.object({
    english: z.string().min(1).max(255),
    japanese: z.string().min(1).max(255).optional(),
    chinese: z.string().min(1).max(255).optional(),
    french: z.string().min(1).max(255),
  }),
  type: z.array(z.string().min(1).max(255)).length(2),
  base: z.object({
    HP: z.number().int().positive(),
    Attack: z.number().int().positive(),
    Defense: z.number().int().positive(),
    "Sp. Attack": z.number().int().positive(),
    "Sp. Defense": z.number().int().positive(),
    Speed: z.number().int().positive(),
  }),
});

const PokemonWithId = Pokemon.extend({
  id: z.number().int().positive(),
});

export type Pokemon = z.infer<typeof Pokemon>;
export type PokemonWithId = z.infer<typeof PokemonWithId>;
