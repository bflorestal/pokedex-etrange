import { LanguageContext } from "../contexts/Language";
import { useContext } from "react";

export default function Header() {
  const value = useContext(LanguageContext);

  return (
    <header className="navbar sticky top-0 z-30 bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Pokédex
        </a>
      </div>
      <div className="flex-none">
        <select
          name="language"
          id="language"
          onChange={value?.handleChange}
          className="select select-bordered w-full max-w-xs"
        >
          {value?.languages.map((lang) => (
            <option key={lang.name} value={lang.name}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
