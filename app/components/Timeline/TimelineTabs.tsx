"use client";

import { ERA_FILTERS } from "../../data/timeline";
import styles from "./Timeline.module.css";

interface TimelineTabsProps {
  active: string;
  onChange: (value: string) => void;
}

const icons = ["▦", "▥", "◈", "♜", "▤", "◎"];

export default function TimelineTabs({ active, onChange }: TimelineTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Historical eras">
      {ERA_FILTERS.map((filter, index) => (
        <button
          type="button"
          role="tab"
          aria-selected={active === filter}
          key={filter}
          onClick={() => onChange(filter)}
          className={`${styles.tab} ${active === filter ? styles.tabActive : ""}`}
        >
          <span aria-hidden="true">{icons[index]}</span>
          {filter}
        </button>
      ))}
    </div>
  );
}
