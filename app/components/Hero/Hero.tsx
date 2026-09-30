import Image from "next/image";
import backgroundImage from "../images/home-hero.png";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <Image
        src={backgroundImage}
        alt="Historic monuments gathered in a cinematic landscape"
        fill
        priority
        sizes="100vw"
        className={styles.background}
      />

      {/*
        A restrained blue atmospheric layer sits between the unchanged artwork
        and the content. It improves readability without darkening the text.
      */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Center content is positioned independently from the artwork. */}
      <div className={styles.content}>
        <div className={styles.eyebrow}>
          <span aria-hidden="true" />
          <p>AN INTERACTIVE DIGITAL MUSEUM</p>
          <span aria-hidden="true" />
        </div>

        <h1>
          <span>EXPLORE THE WONDERS</span>
          <span>HUMANITY CREATED</span>
        </h1>

        <div className={styles.divider} aria-hidden="true" />

        <p className={styles.description}>
          Journey through the world&apos;s greatest wonders, ancient monuments,
          extraordinary architecture, and timeless creations that shaped human
          civilization.
        </p>

        {/* Buttons + scroll hint are now in one layout container */}
        <div className={styles.actions}>
          <a href="#wonders" className={styles.primaryButton}>
            <span>EXPLORE THE WONDERS</span>
            <span aria-hidden="true">→</span>
          </a>

          <a href="#architecture" className={styles.secondaryButton}>
            DISCOVER ARCHITECTURE
          </a>

          {/* Scroll hint is now BELOW the buttons */}
          <a href="#wonders" className={styles.scrollHint}>
            <span>SCROLL TO EXPLORE</span>

            <span className={styles.scrollArrow} aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}