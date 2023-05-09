import { createContext, useState } from "react";

type Language = {
  name: "english" | "french" | "japanese" | "chinese";
  label: string;
};

const languages: Language[] = [
  {
    name: "french",
    label: "🇫🇷",
  },
  {
    name: "english",
    label: "🇬🇧",
  },
  /* */
  {
    name: "japanese",
    label: "🇯🇵",
  },
  {
    name: "chinese",
    label: "🇨🇳",
  },
  /**/
];

type LanguageContextType = {
  languages: Language[];
  currentLang: Language;
  //   setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  //   changeLanguage: (lang: string) => void;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

// Création du contexte
const LanguageContext = createContext<LanguageContextType | null>(null);

// Création du provider
const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentLang, setCurrentLang] = useState(languages[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(
      (lang) => lang.name === event.target.value
    );
    if (selectedLanguage) {
      setCurrentLang(selectedLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ languages, currentLang, handleChange }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
