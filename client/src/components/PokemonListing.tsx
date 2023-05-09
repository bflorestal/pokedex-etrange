import { useContext } from "react";
import { PokemonWithId } from "../../../server/src/modules/pokemon.schema";
import { LanguageContext } from "../contexts/Language";
import styles from "./PokemonListing.module.css";

export default function PokemonListing({
  data,
  searchTerm,
}: {
  data: PokemonWithId[];
  searchTerm: string;
}) {
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

  if (filteredData.length === 0) {
    return (
      <div>
        <p>Aucun Pokémon trouvé</p>
      </div>
    );
  }

  return (
    <div className={styles.listing}>
      {filteredData.map((pokemon) => (
        <article key={pokemon.id} className={styles.pokemon}>
          <p>#{pokemon.id}</p>
          <p className={styles[pokemon.type[0].toLowerCase()]}>
            {pokemon.name[currentLang]
              ? pokemon.name[currentLang]
              : pokemon.name.french}
          </p>
        </article>
      ))}
    </div>
  );
}
