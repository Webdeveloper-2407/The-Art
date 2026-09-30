"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ArchitectureCard from "./ArchitectureCard/ArchitectureCard";
import type { ArchitectureMasterpiece } from "./types/architecture";
import {
  ARCHITECTURE_CATEGORIES,
  ARCHITECTURE_MASTERPIECES,
} from "./data/architectureMasterpieces";
import styles from "./Architecture.module.css";
import { getArchitectureImageSrc } from "./ArchitectureImage";

export interface ArchitectureProps {
  /** Kept optional for compatibility with the existing Home component. */
  items?: ArchitectureMasterpiece[];
  /** Kept optional for compatibility with the existing Home component. */
  onOpen?: (id: string) => void;
}

type FilterKey = "ALL" | string;

type ImageMap = Record<string, string>;

type MediaWikiPage = {
  title?: string;
  thumbnail?: { source?: string };
};

type MediaWikiResponse = {
  query?: {
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
    pages?: MediaWikiPage[];
  };
};

const WIKIPEDIA_API = "https://en.wikipedia.org/w/api.php";
const BATCH_SIZE = 50;

const normalizeTitle = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();

const imageTitleAliases: Record<string, string> = {
  "karnak-temple-complex": "Karnak",
  "abu-simbel-temples": "Abu Simbel",
  "temple-of-artemis-at-ephesus": "Temple of Artemis",
  teotihuacan: "Teotihuacan",
  "topkap-palace": "Topkapı Palace",
  "dolmabah-e-palace": "Dolmabahce Palace",
  "kailasa-temple-ellora": "Kailasa Temple",
  "harmandir-sahib-golden-temple": "Golden Temple",
  "t-dai-ji": "Todai-ji",
  "preah-vihear-temple": "Preah Vihear Temple",
  "alc-zar-of-segovia": "Alcazar of Segovia",
  "s-leymaniye-mosque": "Süleymaniye Mosque",
  "great-mosque-of-c-rdoba": "Mosque–Cathedral of Córdoba",
  "st-peter-s-basilica": "Saint Peter's Basilica",
  "st-paul-s-cathedral": "St Paul's Cathedral",
  "st-mark-s-basilica": "St Mark's Basilica",
  "sacr-c-ur-basilica": "Sacré-Cœur",
  "church-of-saint-george-lalibela": "Church of Saint George, Lalibela",
};

function chunk<T>(items: T[], size: number) {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}

function useWikipediaImages(items: ArchitectureMasterpiece[]) {
  const [images, setImages] = useState<ImageMap>({});

  useEffect(() => {
    let cancelled = false;

    const loadImages = async () => {
      const next: ImageMap = {};

      try {
        const batches = chunk(items, BATCH_SIZE);

        const results = await Promise.all(
          batches.map(async (batch) => {
            const titles = batch
              .map((item) => imageTitleAliases[item.id] ?? item.name)
              .join("|");

            const params = new URLSearchParams({
              action: "query",
              format: "json",
              formatversion: "2",
              prop: "pageimages",
              piprop: "thumbnail|name",
              pithumbsize: "1200",
              pilicense: "free",
              pilimit: "max",
              redirects: "1",
              origin: "*",
              titles,
            });

            const response = await fetch(`${WIKIPEDIA_API}?${params.toString()}`, {
              headers: { Accept: "application/json" },
            });

            if (!response.ok) throw new Error(`Wikipedia API returned ${response.status}`);
            return (await response.json()) as MediaWikiResponse;
          }),
        );

        const titleToImage = new Map<string, string>();
        const redirects = new Map<string, string>();
        const normalized = new Map<string, string>();

        for (const result of results) {
          for (const entry of result.query?.normalized ?? []) {
            normalized.set(normalizeTitle(entry.from), normalizeTitle(entry.to));
          }
          for (const entry of result.query?.redirects ?? []) {
            redirects.set(normalizeTitle(entry.from), normalizeTitle(entry.to));
          }
          for (const page of result.query?.pages ?? []) {
            if (page.title && page.thumbnail?.source) {
              titleToImage.set(normalizeTitle(page.title), page.thumbnail.source);
            }
          }
        }

        for (const item of items) {
          const requested = normalizeTitle(imageTitleAliases[item.id] ?? item.name);
          const canonical = redirects.get(requested) ?? normalized.get(requested) ?? requested;
          const url = titleToImage.get(canonical) ?? titleToImage.get(requested);
          if (url) next[item.id] = url;
        }

        if (!cancelled) setImages(next);
      } catch {
        // The cards keep their rich local fallback even when the remote image API is unavailable.
        if (!cancelled) setImages({});
      }
    };

    loadImages();
    return () => {
      cancelled = true;
    };
  }, [items]);

  return images;
}

export default function Architecture(_props: ArchitectureProps) {
  const [activeCategory, setActiveCategory] = useState<FilterKey>("ALL");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const items = ARCHITECTURE_MASTERPIECES;
  const wikipediaImages = useWikipediaImages(items);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "ALL" || item.categoryFolder === activeCategory;
      if (!matchesCategory) return false;
      if (!normalized) return true;

      return [
        item.name,
        item.category,
        item.location,
        item.tradition,
        item.style,
        item.builtDate,
        item.details,
      ].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [activeCategory, query, items]);

  const selected = selectedId
    ? items.find((item) => item.id === selectedId) ?? null
    : null;

  const selectedImageSrc = selected
    ? getArchitectureImageSrc(selected.id, wikipediaImages[selected.id] ?? null)
    : null;

  useEffect(() => {
    const handleExternalFilter = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const value = customEvent.detail;
      if (!value) return;

      if (value === "all" || value === "ALL") {
        setActiveCategory("ALL");
        return;
      }

      const match = ARCHITECTURE_CATEGORIES.find(
        (category) =>
          category.name.toLowerCase() === String(value).toLowerCase() ||
          category.key.toLowerCase() === String(value).toLowerCase() ||
          category.name.toLowerCase().includes(String(value).toLowerCase()),
      );

      if (match) setActiveCategory(match.key);
    };

    window.addEventListener("art:architecture-filter", handleExternalFilter);
    return () => window.removeEventListener("art:architecture-filter", handleExternalFilter);
  }, []);

  useEffect(() => {
    if (!selected) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedId(null);
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  const clearFilters = () => {
    setActiveCategory("ALL");
    setQuery("");
  };

  return (
    <section id="architecture" className={styles.section}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <p>STRUCTURAL MASTERPIECES</p>
          <h2>
            <em>ARCHITECTURE</em> &amp; MONUMENTS
          </h2>
          <div className={styles.headingRule} />
          <span>
            Explore all 82 documented masterpieces across ancient civilizations,
            palaces, temples, fortresses, religious architecture, and engineering wonders.
          </span>
        </header>

        <div className={styles.toolbar}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon} aria-hidden="true">⌕</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={styles.searchInput}
              placeholder="Search monuments, places, styles, traditions..."
              aria-label="Search architecture and monuments"
            />
            {query && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className={styles.focusSearch}
            onClick={() => searchRef.current?.focus()}
          >
            Search
          </button>
        </div>

        <nav className={styles.filterBar} aria-label="Architecture categories">
          <button
            type="button"
            className={`${styles.filterButton} ${activeCategory === "ALL" ? styles.active : ""}`}
            onClick={() => setActiveCategory("ALL")}
          >
            <span className={styles.filterIcon}>◈</span>
            All Monuments
            <span className={styles.count}>{items.length}</span>
          </button>

          {ARCHITECTURE_CATEGORIES.map((category) => (
            <button
              key={category.key}
              type="button"
              className={`${styles.filterButton} ${activeCategory === category.key ? styles.active : ""}`}
              onClick={() => setActiveCategory(category.key)}
            >
              <span className={styles.filterIcon}>{category.key.slice(0, 2)}</span>
              {category.name}
              <span className={styles.count}>{category.count}</span>
            </button>
          ))}
        </nav>

        <div className={styles.resultsBar}>
          <div>
            <strong>{filteredItems.length}</strong> masterpieces shown
            {activeCategory !== "ALL" && (
              <span>
                {" "}· {ARCHITECTURE_CATEGORIES.find((item) => item.key === activeCategory)?.name}
              </span>
            )}
            {query && <span> · matching “{query}”</span>}
          </div>

          {(query || activeCategory !== "ALL") && (
            <button type="button" onClick={clearFilters} className={styles.resetButton}>
              Reset Filters
            </button>
          )}
        </div>

        {filteredItems.length > 0 ? (
          <div className={styles.grid}>
            {filteredItems.map((item) => (
              <ArchitectureCard
                key={item.id}
                item={item}
                onOpen={setSelectedId}
                remoteImageUrl={wikipediaImages[item.id] ?? null}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyMark}>⌕</div>
            <h3>No masterpieces found</h3>
            <p>Try another monument name, city, country, style, or category.</p>
            <button type="button" onClick={clearFilters} className={styles.resetButton}>
              Show All Monuments
            </button>
          </div>
        )}
      </div>

      {selected && (
        <div className={styles.modalOverlay} onMouseDown={() => setSelectedId(null)}>
          <article
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="architecture-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={() => setSelectedId(null)}
              aria-label="Close monument details"
            >
              ×
            </button>

            <div className={styles.modalHero}>
              {selectedImageSrc ? (
                <img
                  src={selectedImageSrc}
                  alt={`${selected.name} — ${selected.location}`}
                  className={styles.modalHeroImage}
                />
              ) : (
                <div className={styles.modalHeroFallback}>
                  <span>{selected.category}</span>
                  <strong>{selected.name}</strong>
                  <small>{selected.location}</small>
                </div>
              )}
              <div className={styles.modalHeroShade} />
              <div className={styles.modalHeroText}>
                <p>
                  {selected.category.toUpperCase()} · #{String(selected.categoryNumber).padStart(2, "0")}
                </p>
                <h3 id="architecture-detail-title">{selected.name}</h3>
                <span>{selected.location}</span>
              </div>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div>
                  <small>BUILT / MAJOR CONSTRUCTION</small>
                  <strong>{selected.builtDate}</strong>
                </div>
                <div>
                  <small>CIVILIZATION / TRADITION</small>
                  <strong>{selected.tradition}</strong>
                </div>
                <div>
                  <small>ARCHITECTURAL / ENGINEERING STYLE</small>
                  <strong>{selected.style}</strong>
                </div>
                <div>
                  <small>CATEGORY</small>
                  <strong>{selected.category}</strong>
                </div>
              </div>

              <section className={styles.detailSection}>
                <h4>Historical &amp; Architectural Notes</h4>
                <p>{selected.details}</p>
              </section>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className={styles.secondaryButton}
                >
                  Close Details
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
