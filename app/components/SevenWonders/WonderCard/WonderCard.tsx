"use client";

import Image from "next/image";
import type { Monument } from "../../../types/monument";
import styles from "./WonderCard.module.css";

interface WonderCardProps {
  item: Monument;
  onOpen: (id: string) => void;
}

export default function WonderCard({ item, onOpen }: WonderCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={item.heroImage}
          alt={item.name}
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1150px) 50vw, 33vw"
          className={styles.image}
        />
        <div className={styles.imageShade} />
        <span className={styles.category}>
          <span aria-hidden="true">▣</span> {item.type}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span aria-hidden="true">●</span> {item.country.toUpperCase()} — {item.era.toUpperCase()}
        </p>
        <h3>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <button type="button" onClick={() => onOpen(item.id)} className={styles.button}>
          Explore Wonder <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  );
}
