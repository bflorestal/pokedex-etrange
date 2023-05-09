import {
  PokemonSchema,
  pokemonTypes,
} from "../../../server/src/modules/pokemon.schema";

import { createPokemon } from "../utils/pokemon";

export function AddPokemonModal() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Récupération des données du formulaire
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    // Transformation des données pour les rendre compatibles avec le schema
    const formattedData = {
      name: {
        french: data.name1,
        english: data.name2,
      },
      // S'il n'y a pas de 2e type, on ne l'ajoute pas
      type: [data.type1, data.type2].filter((type) => type),
      // TODO: Trouver une méthode plus propre
      base: {
        HP: +data.hp,
        Attack: +data.atk,
        Defense: +data.def,
        "Sp. Attack": +data.spa,
        "Sp. Defense": +data.spd,
        Speed: +data.speed,
      },
    };

    // Validation des données
    const validatedPokemon = PokemonSchema.safeParse(formattedData);

    if (!validatedPokemon.success) {
      alert("Les données saisies sont invalides");
      return;
    }

    const res = createPokemon(validatedPokemon.data);

    // TODO: Fermer la modale et afficher un message de succès

    form.reset();
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
            <span className="text-lg font-bold">Ajouter un Pokémon</span>
            <div className="my-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {/* Nom français */}
              <div className="form-control w-full max-w-xs">
                <label htmlFor="name1" className="label">
                  <span className="label-text">Nom français</span>
                </label>
                <input
                  type="text"
                  id="name1"
                  name="name1"
                  className="input input-bordered input-sm w-full max-w-xs"
                  min={2}
                  required={true}
                />
              </div>
              {/* Nom anglais */}
              <div className="form-control w-full max-w-xs">
                <label htmlFor="name2" className="label">
                  <span className="label-text">Nom anglais</span>
                </label>
                <input
                  type="text"
                  id="name2"
                  name="name2"
                  className="input input-bordered input-sm w-full max-w-xs"
                  min={2}
                  required={true}
                />
              </div>
              {/* Type 1 */}
              <div className="form-control w-full max-w-xs">
                <label htmlFor="type1" className="label">
                  <span className="label-text">Type 1</span>
                </label>
                <select
                  id="type1"
                  name="type1"
                  required={true}
                  className="select select-bordered"
                >
                  <option disabled>Choisissez un type</option>
                  {pokemonTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {/* Type 2 */}
              <div className="form-control w-full max-w-xs">
                <label htmlFor="type2" className="label">
                  <span className="label-text">Type 2</span>
                </label>
                <select
                  id="type2"
                  name="type2"
                  className="select select-bordered"
                >
                  <option disabled>Choisissez un type</option>
                  <option value="">Aucun</option>
                  {pokemonTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              {/* HP */}
              <div className="form-control">
                <label htmlFor="hp" className="label">
                  <span className="label-text">HP</span>
                </label>
                <input
                  type="number"
                  id="hp"
                  name="hp"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
              {/* ATK */}
              <div className="form-control">
                <label htmlFor="atk" className="label">
                  <span className="label-text">Attaque</span>
                </label>
                <input
                  type="number"
                  id="atk"
                  name="atk"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
              {/* DEF */}
              <div className="form-control w-full max-w-xs">
                <label htmlFor="def" className="label">
                  <span className="label-text">Défense</span>
                </label>
                <input
                  type="number"
                  id="def"
                  name="def"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
              {/* SpA */}
              <div className="form-control">
                <label htmlFor="spa" className="label">
                  <span className="label-text">Attaque Spéciale</span>
                </label>
                <input
                  type="number"
                  id="spa"
                  name="spa"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
              {/* SpD */}
              <div className="form-control">
                <label htmlFor="spd" className="label">
                  <span className="label-text">Défense Spéciale</span>
                </label>
                <input
                  type="number"
                  id="spd"
                  name="spd"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
              {/* Speed */}
              <div className="form-control">
                <label htmlFor="speed" className="label">
                  <span className="label-text">Vitesse</span>
                </label>
                <input
                  type="number"
                  id="speed"
                  name="speed"
                  className="input input-bordered input-sm"
                  min={1}
                  max={255}
                  required={true}
                />
              </div>
            </div>
            <button type="submit" className="btn">
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
