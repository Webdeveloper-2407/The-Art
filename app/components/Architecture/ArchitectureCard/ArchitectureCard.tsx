"use client";

import type { ArchitectureMasterpiece } from "../types/architecture";
import styles from "./ArchitectureCard.module.css";
import { getArchitectureImageSrc, getArchitectureLocalImageSrc } from "../ArchitectureImage";


interface ArchitectureCardProps {
  item: ArchitectureMasterpiece;
  onOpen: (id: string) => void;
  remoteImageUrl?: string | null;
}

const fallbackTone = (category: string) => {
  if (category.includes("Ancient")) return styles.ancient;
  if (category.includes("Palaces")) return styles.palace;
  if (category.includes("Temple")) return styles.temple;
  if (category.includes("Fortress")) return styles.fortress;
  if (category.includes("Religious")) return styles.religious;
  return styles.engineering;
};

export default function ArchitectureCard({ item, onOpen, remoteImageUrl }: ArchitectureCardProps) {
  const localSrc = getArchitectureLocalImageSrc(item.id);
  const imageSrc = getArchitectureImageSrc(item.id, remoteImageUrl);
  const fallbackClass = fallbackTone(item.category);
  const usingRemote = !localSrc && Boolean(remoteImageUrl);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${item.name} — ${item.location}`}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div
            className={`${styles.imageFallback} ${fallbackClass}`}
            aria-label={`${item.name} image placeholder`}
          >
            <div className={styles.fallbackGrid} />
            <span className={styles.fallbackKicker}>{item.category}</span>
            <div className={styles.fallbackMonogram}>{item.name.slice(0, 2).toUpperCase()}</div>
            <strong>{item.name}</strong>
            <span>{item.location}</span>
          </div>
        )}

        <div className={styles.imageShade} />

        <div className={styles.topRow}>
          <span className={styles.badge}>{item.category}</span>
          <span className={styles.number}>#{String(item.categoryNumber).padStart(2, "0")}</span>
        </div>

        <div className={styles.imageCaption}>
          <span>{usingRemote ? "WIKIPEDIA / WIKIMEDIA" : "ARCHIVE IMAGE"}</span>
          <strong>{item.name}</strong>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.location}>{item.location}</p>
        <h3>{item.name}</h3>
        <p className={styles.style}>{item.style}</p>
        <p className={styles.details}>{item.details}</p>

        <div className={styles.metaGrid}>
          <div>
            <span>BUILT / MAJOR WORK</span>
            <strong>{item.builtDate}</strong>
          </div>
          <div>
            <span>TRADITION</span>
            <strong>{item.tradition}</strong>
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.detailsButton}
            onClick={() => onOpen(item.id)}
          >
            View Full Details <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}
