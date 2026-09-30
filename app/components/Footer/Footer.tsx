"use client";

import type { Monument } from "../../types/monument";
import FooterColumn from "./FooterColumn/FooterColumn";
import styles from "./Footer.module.css";

interface FooterProps {
  wonders: Monument[];
  architecture: Monument[];
  onOpen: (id: string) => void;
}

const navigation = [
  ["Home", "hero"],
  ["Seven Wonders", "wonders"],
  ["Architecture", "architecture"],
  ["Explore Categories", "explore"],
  ["Timeline", "timeline"],
] as const;

export default function Footer({
  wonders,
  architecture,
  onOpen,
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      {/* Footer background image + dark overlay */}
      <div className={styles.bg} aria-hidden="true" />

      {/* Gold architectural divider + center emblem */}
      <div className={styles.ornament} aria-hidden="true">
        <span>
          <svg
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Roof */}
            <path d="M5 17 L24 6 L43 17 Z" />

            {/* Horizontal architectural lines */}
            <path d="M9 20 H39" />
            <path d="M7 38 H41" />
            <path d="M5 42 H43" />

            {/* Columns */}
            <path d="M12 21 V36" />
            <path d="M20 21 V36" />
            <path d="M28 21 V36" />
            <path d="M36 21 V36" />

            {/* Base */}
            <path d="M8 18 H40" />
          </svg>
        </span>
      </div>

      {/* Main footer content */}
      <div className={styles.container}>
        {/* Brand / description */}
        <div className={styles.brandCol}>
          <a href="#hero" className={styles.brand}>
            <span>THE ART</span>
            <small>Wonders of Civilization</small>
          </a>

          <div className={styles.goldRule} />

          <p>
            An interactive digital museum and archive exploring humanity&apos;s
            greatest architectural and artistic monuments.
          </p>
        </div>

        {/* Navigation */}
        <FooterColumn title="NAVIGATION">
          <ul>
            {navigation.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`}>{label}</a>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Seven Wonders */}
        <FooterColumn title="SEVEN WONDERS">
          <ul>
            {wonders.map((wonder) => (
              <li key={wonder.id}>
                <button
                  type="button"
                  onClick={() => onOpen(wonder.id)}
                >
                  {wonder.name}
                </button>
              </li>
            ))}
          </ul>
        </FooterColumn>

        {/* Featured Landmarks */}
        <FooterColumn title="FEATURED LANDMARK">
          <ul>
            {architecture.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onOpen(item.id)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </FooterColumn>
      </div>

      {/* Bottom copyright bar */}
      <div className={styles.bottom}>
        <span className={styles.monogram}>N</span>

        <p>
          © 2026 The Art Platform. Crafted for preservation and exploration
          of world cultural heritage.
        </p>

        <span>
          Designed with Semantic HTML / Modular Architecture.
        </span>
      </div>
    </footer>
  );
}