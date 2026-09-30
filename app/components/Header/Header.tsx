"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbar";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import styles from "./Header.module.css";

interface HeaderProps {
  onSearch: () => void;
}

const sections = [
  { id: "hero", label: "Home" },
  { id: "wonders", label: "Seven Wonders" },
  { id: "architecture", label: "Architecture" },
  { id: "explore", label: "Explore" },
  { id: "timeline", label: "Timeline" },
];

export default function Header({ onSearch }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement | null>(null);
  const navigationTargetRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observed = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!observed.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const lockedTarget = navigationTargetRef.current;

        // While a navbar link is being followed, keep the clicked item active.
        // This prevents HOME from staying gold during the smooth scroll.
        if (lockedTarget) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -52% 0px",
        threshold: [0.15, 0.35, 0.6],
      },
    );

    observed.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleNavigationClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest<HTMLAnchorElement>("a[href^='#']");

      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const sectionId = href.slice(1);
      const isSectionLink = sections.some((section) => section.id === sectionId);

      if (!isSectionLink) return;

      // Immediately move the gold active state to the item that was clicked.
      setActiveSection(sectionId);
      navigationTargetRef.current = sectionId;
    };

    header.addEventListener("click", handleNavigationClick);

    return () => {
      header.removeEventListener("click", handleNavigationClick);
    };
  }, []);

  useEffect(() => {
    const handleNavigationScroll = () => {
      const targetId = navigationTargetRef.current;
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) {
        navigationTargetRef.current = null;
        return;
      }

      const topOffset = 70;
      const distanceFromNav = Math.abs(target.getBoundingClientRect().top - topOffset);

      // Release the lock when the clicked section has reached its final position.
      // The observer can then continue tracking the active section normally.
      if (distanceFromNav <= 120) {
        navigationTargetRef.current = null;
        setActiveSection(targetId);
      }
    };

    window.addEventListener("scroll", handleNavigationScroll, { passive: true });
    handleNavigationScroll();

    return () => {
      window.removeEventListener("scroll", handleNavigationScroll);
    };
  }, []);

  const handleNavigate = () => setMobileOpen(false);

  return (
    <header
      ref={headerRef}
      className={`${styles.siteHeader} ${scrolled ? styles.scrolled : ""}`}
    >
      <Navbar
        activeSection={activeSection}
        onSearch={onSearch}
        onMenu={() => setMobileOpen((value) => !value)}
        mobileOpen={mobileOpen}
      />

      <MobileNavigation
        open={mobileOpen}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </header>
  );
}
