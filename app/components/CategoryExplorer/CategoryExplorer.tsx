"use client";

import type { Category } from "../../types/monument";
import styles from "./CategoryExplorer.module.css";

interface CategoryExplorerProps {
  categories: Category[];
  onCategoryClick: (name: string) => void;
}

export default function CategoryExplorer({ categories, onCategoryClick }: CategoryExplorerProps) {
  return (
    <section id="explore" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.heading}>
          <p>DISCOVERY PORTAL</p>
          <h2>EXPLORE BY CATEGORY</h2>
          <span>
            Delve into specialized collections categorized by architectural
            typology and historical civilization.
          </span>
        </header>

        <div className={styles.grid}>
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={styles.card}
              onClick={() => onCategoryClick(category.name)}
            >
              <span className={styles.number}>{category.icon}</span>
              <span className={styles.name}>{category.name}</span>
              <span className={styles.count}>{category.count} MASTERPIECES</span>
              <span className={styles.arrow}>→</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
