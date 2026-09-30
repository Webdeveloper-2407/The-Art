"use client";

import styles from "./Navbar.module.css";

interface NavbarProps {
  activeSection: string;
  onSearch: () => void;
  onMenu: () => void;
  mobileOpen: boolean;
}

const navItems = [
  { href: "#hero", id: "hero", label: "HOME" },
  { href: "#wonders", id: "wonders", label: "SEVEN WONDERS" },
  { href: "#architecture", id: "architecture", label: "ARCHITECTURE" },
  { href: "#explore", id: "explore", label: "EXPLORE" },
  { href: "#timeline", id: "timeline", label: "TIMELINE" },
];

export default function Navbar({
  activeSection,
  onSearch,
  onMenu,
  mobileOpen,
}: NavbarProps) {
  return (
    <div className={styles.headerContainer}>
      <a href="#hero" className={styles.brandLogo} aria-label="The Art home">
        <span className={styles.brandTitle}>THE ART</span>
        <span className={styles.brandSlash}>/</span>
        <span className={styles.brandSubtitle}>Wonders of Civilization</span>
      </a>

      <nav className={styles.desktopNav} aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`${styles.navLink} ${activeSection === item.id ? styles.active : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={onSearch}
          className={styles.searchButton}
          aria-label="Search monuments"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="6.8" />
            <path d="M16.2 16.2 21 21" />
          </svg>
        </button>

        <button
          type="button"
          onClick={onMenu}
          className={styles.menuButton}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  );
}
