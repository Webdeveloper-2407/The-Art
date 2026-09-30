"use client";

import type { ReactNode } from "react";
import styles from "./FooterColumn.module.css";

interface FooterColumnProps {
  title: string;
  children: ReactNode;
}

export default function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
