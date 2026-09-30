"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Monument } from "../../types/monument";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  open: boolean;
  items: Monument[];
  onClose: () => void;
  onSelect: (item: Monument) => void;
}

export default function SearchModal({ open, items, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const results = items.filter((item) => {
    const haystack = `${item.name} ${item.country} ${item.type} ${item.era}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Search monuments" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close search">×</button>
        <p className={styles.eyebrow}>DISCOVERY SEARCH</p>
        <h2>Find a Monument</h2>

        <label className={styles.searchBox}>
          <span>⌕</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search wonders, countries, eras..." />
        </label>

        <div className={styles.results}>
          {results.length === 0 ? (
            <p className={styles.empty}>No monument matched your search.</p>
          ) : (
            results.map((item) => (
              <button type="button" key={item.id} className={styles.result} onClick={() => onSelect(item)}>
                <Image src={item.heroImage} alt="" width={92} height={68} className={styles.resultImage} />
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.country} · {item.era}</small>
                </span>
                <b>→</b>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
