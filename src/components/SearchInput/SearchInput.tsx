import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor="product-search">
        Поиск по названию
      </label>
      <input
        id="product-search"
        className={styles.input}
        type="text"
        placeholder="Например, часы или колонка"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
