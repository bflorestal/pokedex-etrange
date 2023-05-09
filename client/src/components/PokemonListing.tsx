import { useContext } from "react";
import { PokemonWithId } from "../../../server/src/modules/pokemon.schema";
import { LanguageContext } from "../contexts/Language";

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
    <div>
      {filteredData.map((pokemon) => (
        <article key={pokemon.id}>
          <p className={`type__${pokemon.type[0].toLowerCase()}`}>
            {pokemon.name[currentLang]
              ? pokemon.name[currentLang]
              : pokemon.name.french}
          </p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={
              pokemon.name[currentLang]
                ? pokemon.name[currentLang]
                : pokemon.name.french
            }
          />
        </article>
      ))}
    </div>
  );
}
