import type { StaticImageData } from "next/image";

export type MonumentImage = StaticImageData | string;

export interface Monument {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: string;
  location: string;
  country: string;
  era: string;
  year: string;
  architect: string;
  materials: string;
  heroImage: MonumentImage;
  description: string;
  historicalBackground: string;
  architecture: string;
  purpose: string;
  facts: string[];
}

export interface Category {
  name: string;
  icon: string;
  count: number;
}

export type TimelineEra =
  | "All Eras"
  | "Ancient Era (BCE)"
  | "Classical Era (1 - 1000 CE)"
  | "Medieval Era (1000 - 1500 CE)"
  | "Early Modern Era (1500 - 1900 CE)"
  | "Modern Era (1900+ CE)";
