import { useContext } from "react";
import { PokemonWithId } from "../../../server/src/modules/pokemon.schema";
import { LanguageContext } from "../contexts/Language";
import { MainContext } from "../contexts/Main";
import styles from "./PokemonListing.module.css";
import { deletePokemon } from "../utils/pokemon";

type PokemonListingProps = {
  data: PokemonWithId[];
  searchTerm: string;
  setData: React.Dispatch<React.SetStateAction<PokemonWithId[]>>;
};

export default function PokemonListing({
  data,
  searchTerm,
  setData,
}: PokemonListingProps) {
  const languageValue = useContext(LanguageContext);
  const currentLang = languageValue ? languageValue.currentLang.name : "french";

  const mainValue = useContext(MainContext);

  const filteredData = data.filter((pokemon) => {
    const filteredList =
      pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.japanese?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.chinese?.toLowerCase().includes(searchTerm.toLowerCase());

    return filteredList;
  });

  const handleUpdate = (id: number) => {
    mainValue?.changeCurrentPokemonId(id);

    mainValue?.setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce Pokémon ?")) {
      return;
    }

    const res = await deletePokemon(id);

    if (!res) {
      alert(`Une erreur est survenue lors de la suppression du Pokémon #${id}`);
      return;
    }

    const newData = data.filter((pokemon) => pokemon.id !== id);
    setData(newData);
  };

  if (filteredData.length === 0) {
    return (
      <div>
        <p>Aucun Pokémon trouvé</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Types</th>
            <th>PV</th>
            <th>Attaque</th>
            <th>Défense</th>
            <th>Attaque Spé.</th>
            <th>Défense Spé.</th>
            <th>Vitesse</th>
            <th colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((pokemon) => (
            <tr key={pokemon.id} className="hover">
              <td>{pokemon.id}</td>
              <td className={styles[pokemon.type[0].toLowerCase()]}>
                {pokemon.name[currentLang]
                  ? pokemon.name[currentLang]
                  : pokemon.name.french}
              </td>
              <td className={styles.types}>
                {pokemon.type.map((type) => (
                  <p key={type} className={styles[type.toLowerCase()]}>
                    {type}
                  </p>
                ))}
              </td>
              {Object.values(pokemon.base).map((stat, index) => (
                <td key={`${pokemon.id}-${index}-${stat}`}>{stat}</td>
              ))}

              <td>
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-circle btn-primary btn-sm mr-2"
                  onClick={() => handleUpdate(pokemon.id)}
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    className="h-6 w-6"
                    strokeWidth={0}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {" "}
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
                  </svg>
                </label>
                <button
                  onClick={() => handleDelete(pokemon.id)}
                  className="btn btn-circle btn-error btn-sm"
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
