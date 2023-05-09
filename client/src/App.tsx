import { useEffect, useState } from "react";
import "./App.css";

import type { PokemonWithId } from "../../server/src/modules/pokemon.schema";
import PokemonListing from "./components/PokemonListing";

import { getAllPokemon } from "./utils/pokemon";

export default function App() {
  const [data, setData] = useState<PokemonWithId[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPokemon();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <section>
        <div>
          <h1>Pokédex Étrange</h1>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={handleChange}
          />
        </div>
        <div>
          {isLoading ? (
            <p>Chargement...</p>
          ) : (
            <PokemonListing data={data} searchTerm={search} />
          )}
        </div>
      </section>
    </main>
  );
}
