"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { Monument } from "../../types/monument";
import styles from "./DetailModal.module.css";

interface DetailModalProps {
  item: Monument | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  useEffect(() => {
    if (!item) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <article className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="detail-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close monument details">×</button>
        <div className={styles.hero}>
          <Image src={item.heroImage} alt={item.name} fill sizes="(max-width: 900px) 100vw, 70vw" className={styles.heroImage} priority />
          <div className={styles.heroShade} />
          <div className={styles.heroText}>
            <p>{item.category.toUpperCase()} · {item.type.toUpperCase()}</p>
            <h2 id="detail-title">{item.name}</h2>
          </div>
        </div>

        <div className={styles.body}>
          <div className={styles.metaGrid}>
            <div><small>LOCATION</small><strong>{item.location}, {item.country}</strong></div>
            <div><small>ERA &amp; DATE</small><strong>{item.year}</strong></div>
            <div><small>ARCHITECT / BUILDER</small><strong>{item.architect}</strong></div>
            <div><small>PRIMARY MATERIALS</small><strong>{item.materials}</strong></div>
          </div>

          <section><h3>Historical Background</h3><p>{item.historicalBackground}</p></section>
          <section><h3>Architecture &amp; Design</h3><p>{item.architecture}</p></section>
          <section><h3>Purpose &amp; Significance</h3><p>{item.purpose}</p></section>
          <section>
            <h3>Important Historical Facts</h3>
            <ul>{item.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
          </section>
        </div>
      </article>
    </div>
  );
}
