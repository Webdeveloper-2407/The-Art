"use client";

import Image from "next/image";
import type { Monument } from "../../../types/monument";
import styles from "./TimelineItem.module.css";

interface TimelineItemProps {
  item: Monument;
  onOpen: (id: string) => void;
}

export default function TimelineItem({
  item,
  onOpen,
}: TimelineItemProps) {
  return (
    <article className={styles.item}>
      <aside className={styles.dateCol}>
        <div className={styles.marker} aria-hidden="true">
          <span />
        </div>

        <div className={styles.dateContent}>
          <strong>{item.year}</strong>
          <span>{item.era.toUpperCase()}</span>
        </div>
      </aside>

      <div className={styles.card}>
        {/* SAME monument image used as a deep background */}
        <div className={styles.background} aria-hidden="true">
          <Image
            src={item.heroImage}
            alt=""
            fill
            sizes="60vw"
            className={styles.backgroundImage}
          />
        </div>

        {/* Clear foreground image */}
        <div className={styles.imageWrap}>
          <Image
            src={item.heroImage}
            alt={item.name}
            fill
            sizes="(max-width: 700px) 100vw, 620px"
            className={styles.image}
            priority={false}
          />
        </div>

        <div className={styles.copy}>
          <p className={styles.location}>
            <span aria-hidden="true">●</span>
            {item.country.toUpperCase()}
          </p>

          <h3>{item.name}</h3>

          <div className={styles.rule} />

          <p className={styles.description}>
            {item.description}
          </p>

          <button
            type="button"
            className={styles.button}
            onClick={() => onOpen(item.id)}
          >
            <span>View Monument Details</span>
            <strong>→</strong>
          </button>
        </div>
      </div>
    </article>
  );
}
