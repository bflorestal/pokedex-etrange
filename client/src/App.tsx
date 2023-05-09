import { useEffect, useState } from "react";

import type { PokemonWithId } from "../../server/src/modules/pokemon.schema";
import { getAllPokemon } from "./utils/pokemon";

import Header from "./components/Header";
import PokemonListing from "./components/PokemonListing";
import Loading from "./components/Loading";
import { AddPokemonModal } from "./components/Modal";

export default function App() {
  const [data, setData] = useState<PokemonWithId[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // TODO: Déplacer dans un contexte
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
        <section className="flex flex-col justify-center items-center gap-6 container">
          <h1 className="font-bold text-4xl text-center">Pokédex Étrange</h1>
          <div className="w-full flex gap-4 max-w-2xl">
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <label
              htmlFor="my-modal-3"
              className="btn btn-circle btn-md text-2xl"
            >
              +
            </label>

            <AddPokemonModal />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <PokemonListing data={data} searchTerm={search} setData={setData} />
          )}
        </section>
      </main>
    </>
  );
}
