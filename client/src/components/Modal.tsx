// Import des schemas permettant de valider les données
import {
  PokemonSchema,
  PokemonSchemaWithId,
  PokemonWithId,
  pokemonTypes,
} from "../../../server/src/modules/pokemon.schema";

import { createPokemon, updatePokemon } from "../utils/pokemon";

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

    if (!res) {
      alert("Une erreur est survenue lors de la création du Pokémon");
      return;
    }

    // TODO: Fermer la modale et afficher un message de succès

    form.reset();
  };

  return (
    <>
      <input type="checkbox" id="my-modal-2" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <PokemonForm addPokemon={handleSubmit} formType="add" />
        </div>
      </div>
    </>
  );
}

export function EditPokemonModal({ pokemon }: { pokemon: PokemonWithId }) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Récupération des données du formulaire
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    // Transformation des données pour les rendre compatibles avec le schema
    const formattedData = {
      id: pokemon.id,
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
    const validatedPokemon = PokemonSchemaWithId.safeParse(formattedData);

    if (!validatedPokemon.success) {
      alert("Les données saisies sont invalides");
      return;
    }

    const res = updatePokemon(validatedPokemon.data.id, validatedPokemon.data);

    if (!res) {
      alert(
        `Une erreur est survenue lors de la modification de ${pokemon.name.french}`
      );
      return;
    }

    // TODO: Fermer la modale et afficher un message de succès

    form.reset();
  };

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <PokemonForm
            editPokemon={handleSubmit}
            formType="edit"
            pokemon={pokemon}
          />
        </div>
      </div>
    </>
  );
}

// Formulaire d'ajout ou de modification d'un Pokémon
type PokemonFormProps = {
  addPokemon?: (e: React.FormEvent<HTMLFormElement>) => void;
  editPokemon?: (e: React.FormEvent<HTMLFormElement>) => void;
  formType: "add" | "edit";
  pokemon?: PokemonWithId;
};

function PokemonForm({
  addPokemon,
  editPokemon,
  formType,
  pokemon,
}: PokemonFormProps) {
  return (
    <form onSubmit={formType === "edit" ? editPokemon : addPokemon}>
      <label
        htmlFor={formType === "edit" ? "my-modal-3" : "my-modal-2"}
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
      <span className="text-lg font-bold">
        {formType === "edit"
          ? `Modifier ${pokemon?.name.french}`
          : "Ajouter un Pokémon"}
      </span>
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
            min={2}
            max={70}
            defaultValue={pokemon?.name.french}
            required={true}
            className="input input-bordered input-sm w-full max-w-xs"
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
            min={2}
            max={70}
            defaultValue={pokemon?.name.english}
            required={true}
            className="input input-bordered input-sm w-full max-w-xs"
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
              <option
                key={type}
                value={type}
                selected={type === pokemon?.type[0]}
              >
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
          <select id="type2" name="type2" className="select select-bordered">
            <option disabled>Choisissez un type</option>
            <option value="">Aucun</option>
            {pokemonTypes.map((type) => (
              <option
                key={type}
                value={type}
                selected={type === pokemon?.type[1]}
              >
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
            min={1}
            max={255}
            defaultValue={pokemon?.base.HP}
            required={true}
            className="input input-bordered input-sm"
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
            min={1}
            max={255}
            defaultValue={pokemon?.base.Attack}
            required={true}
            className="input input-bordered input-sm"
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
            min={1}
            max={255}
            defaultValue={pokemon?.base.Defense}
            required={true}
            className="input input-bordered input-sm"
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
            min={1}
            max={255}
            defaultValue={pokemon?.base["Sp. Attack"]}
            required={true}
            className="input input-bordered input-sm"
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
            min={1}
            max={255}
            defaultValue={pokemon?.base["Sp. Defense"]}
            required={true}
            className="input input-bordered input-sm"
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
            min={1}
            max={255}
            defaultValue={pokemon?.base.Speed}
            required={true}
            className="input input-bordered input-sm"
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {formType === "add" ? "Ajouter" : "Modifier"}
      </button>
    </form>
  );
}
