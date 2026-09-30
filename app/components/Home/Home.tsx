"use client";

import { useState } from "react";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import SevenWonders from "../SevenWonders/SevenWonders";
import Architecture from "../Architecture/Architecture";
import CategoryExplorer from "../CategoryExplorer/CategoryExplorer";
import Timeline from "../Timeline/Timeline";
import DetailModal from "../DetailModal/DetailModal";
import SearchModal from "../Search/SearchModal";
import Footer from "../Footer/Footer";

import {
  ARCHITECTURE_DATA,
  SEVEN_WONDERS_DATA,
} from "../../data/monuments";

import { CATEGORIES_DATA } from "../../data/categories";
import { TIMELINE_DATA } from "../../data/timeline";

import type { Monument } from "../../types/monument";
import styles from "./Home.module.css";

const ALL_MONUMENTS = [
  ...SEVEN_WONDERS_DATA,
  ...ARCHITECTURE_DATA,
];

export default function Home() {
  const [selectedMonument, setSelectedMonument] =
    useState<Monument | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);

  const handleOpen = (id: string) => {
    const item =
      ALL_MONUMENTS.find((monument) => monument.id === id) ?? null;

    setSelectedMonument(item);
  };

  const handleCategoryClick = (name: string) => {
    const architectureCategoryMap: Record<string, string> = {
      "Palaces & Estates": "Palace",
      "Sacred Temples": "Temple",
      "Religious Architecture": "Religious Architecture",
      "Fortresses & Citadels": "all",
    };

    const filter = architectureCategoryMap[name];

    const architecture =
      document.getElementById("architecture");

    if (!architecture) return;

    architecture.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (filter) {
      window.setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent("art:architecture-filter", {
            detail: filter,
          }),
        );
      }, 150);
    }
  };

  return (
    <div className={styles.siteShell}>
      <Header
        onSearch={() => setSearchOpen(true)}
      />

      <main>
        <Hero />

        <SevenWonders
          items={SEVEN_WONDERS_DATA}
          onOpen={handleOpen}
        />

        {/* Architecture manages its own ArchitectureMasterpiece data */}
        <Architecture />

        <CategoryExplorer
          categories={CATEGORIES_DATA}
          onCategoryClick={handleCategoryClick}
        />

        <Timeline
          items={TIMELINE_DATA}
          onOpen={handleOpen}
        />
      </main>

      <Footer
        wonders={SEVEN_WONDERS_DATA}
        architecture={ARCHITECTURE_DATA}
        onOpen={handleOpen}
      />

      <DetailModal
        item={selectedMonument}
        onClose={() => setSelectedMonument(null)}
      />

      <SearchModal
        open={searchOpen}
        items={ALL_MONUMENTS}
        onClose={() => setSearchOpen(false)}
        onSelect={(item) => {
          setSearchOpen(false);
          setSelectedMonument(item);
        }}
      />
    </div>
  );
}
