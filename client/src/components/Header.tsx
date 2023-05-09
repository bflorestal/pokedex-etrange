import { LanguageContext } from "../contexts/Language";
import styles from "./Header.module.css";
import { useContext } from "react";

export default function Header() {
  const value = useContext(LanguageContext);

  return (
    <header className={styles.header}>
      <div>
        <a href="/" className={styles.brand}>
          Pokédex
        </a>
      </div>
      <div>
        <select name="language" id="language" onChange={value?.handleChange}>
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
