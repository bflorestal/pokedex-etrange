import { createContext, useState } from "react";

type MainContextType = {
  currentPokemonId: number | null;
  changeCurrentPokemonId: (id: number) => void;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

// Création du contexte
const MainContext = createContext<MainContextType | null>(null);

// Création du provider
const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPokemonId, setCurrentPokemonId] = useState<number | null>(null);

  const changeCurrentPokemonId = (id: number) => {
    setCurrentPokemonId(id);
  };

  return (
    <MainContext.Provider
      value={{
        changeCurrentPokemonId,
        currentPokemonId,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainContext, MainProvider };
