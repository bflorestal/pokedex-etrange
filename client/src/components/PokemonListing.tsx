import { useContext } from "react";
import { PokemonWithId } from "../../../server/src/modules/pokemon.schema";
import { LanguageContext } from "../contexts/Language";
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
  const value = useContext(LanguageContext);
  const currentLang = value!.currentLang.name;

  const filteredData = data.filter((pokemon) => {
    const filteredList =
      pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.japanese?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pokemon.name.chinese?.toLowerCase().includes(searchTerm.toLowerCase());

    return filteredList;
  });

  const handleDelete = async (id: number) => {
    const res = await deletePokemon(id);

    const newData = data.filter((pokemon) => pokemon.id !== id);
    setData(newData);

    alert(res.message);
  };

  if (filteredData.length === 0) {
    return (
      <div>
        <p>Aucun Pokémon trouvé</p>
      </div>
    );
  }

  return (
    <table>
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
        </tr>
      </thead>
      <tbody>
        {filteredData.map((pokemon) => (
          <tr key={pokemon.id}>
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
              <button onClick={() => handleDelete(pokemon.id)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
