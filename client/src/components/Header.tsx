import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div>
        <a href="/" className={styles.brand}>
          Pokédex
        </a>
      </div>
      <div>
        <select name="language" id="language">
          <option value="french">🇫🇷</option>
          <option value="english">🇬🇧</option>
        </select>
      </div>
    </header>
  );
}
