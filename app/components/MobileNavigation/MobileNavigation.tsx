"use client";

import styles from "./MobileNavigation.module.css";

interface MobileNavigationProps {
  open: boolean;
  activeSection: string;
  onNavigate: () => void;
}

const links = [
  ["hero", "HOME"],
  ["wonders", "SEVEN WONDERS"],
  ["architecture", "ARCHITECTURE"],
  ["explore", "EXPLORE"],
  ["timeline", "TIMELINE"],
] as const;

export default function MobileNavigation({
  open,
  activeSection,
  onNavigate,
}: MobileNavigationProps) {
  if (!open) return null;

  return (
    <div className={styles.panel}>
      <nav aria-label="Mobile navigation" className={styles.nav}>
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onNavigate}
            className={activeSection === id ? styles.active : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
