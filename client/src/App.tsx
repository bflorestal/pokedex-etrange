import { useEffect, useState } from "react";

import type { PokemonWithId } from "../../server/src/modules/pokemon.schema";
import { getAllPokemon } from "./utils/pokemon";

import Header from "./components/Header";
import PokemonListing from "./components/PokemonListing";
import Loading from "./components/Loading";

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
    <>
      <Header />
      <main>
        <section className="flex flex-col justify-center items-center gap-6">
          <h1 className="font-bold text-4xl text-center">Pokédex Étrange</h1>
          <div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="overflow-x-auto">
            {isLoading ? (
              <Loading />
            ) : (
              <PokemonListing
                data={data}
                searchTerm={search}
                setData={setData}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
