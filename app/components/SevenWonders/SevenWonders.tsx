"use client";

import Image from "next/image";
import type { Monument } from "../../types/monument";
import WonderCard from "./WonderCard/WonderCard";
import styles from "./SevenWonders.module.css";
import heroImage from "../images/christ-the-redeemer.png";

interface SevenWondersProps {
  items: Monument[];
  onOpen: (id: string) => void;
}

export default function SevenWonders({ items, onOpen }: SevenWondersProps) {
  const cards = items.slice(0, 6);
  const featured = items[6];

  return (
    <section id="wonders" className={styles.section}>
      <div className={styles.sectionBackground} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>LEGENDARY ACHIEVEMENTS</p>
          <h2>THE SEVEN WONDERS</h2>
          <p>
            The iconic monuments selected by millions around the globe as
            symbols of human ingenuity and endurance.
          </p>
          <div className={styles.divider}>
            <span />
            <b>▥</b>
            <span />
          </div>
        </header>

        <div className={styles.grid}>
          {cards.map((item) => (
            <WonderCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>

        {featured && (
          <article className={styles.featured}>
            <Image
              src={heroImage}
              alt={featured.name}
              fill
              sizes="100vw"
              className={styles.featuredImage}
              priority
            />
            <div className={styles.featuredOverlay} />
            <div className={styles.featuredContent}>
              <span className={styles.featuredBadge}>
                ✦ &nbsp; MONUMENTAL STATUE
              </span>
              <p className={styles.featuredMeta}>
                {featured.country.toUpperCase()} — {featured.era.toUpperCase()}
              </p>
              <h3>
                Christ the <em>Redeemer</em>
              </h3>
              <div className={styles.featuredRule} />
              <p className={styles.featuredDescription}>{featured.description}</p>
              <div className={styles.featuredActions}>
                <button type="button" onClick={() => onOpen(featured.id)}>
                  Explore Wonder <span>→</span>
                </button>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
