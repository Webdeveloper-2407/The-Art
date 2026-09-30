import { MONUMENTS_DATA } from "./monuments";
import type { Monument } from "../types/monument";

export const TIMELINE_DATA: Monument[] = [...MONUMENTS_DATA];

export const ERA_FILTERS = [
  "All Eras",
  "Ancient Era (BCE)",
  "Classical Era (1 - 1000 CE)",
  "Medieval Era (1000 - 1500 CE)",
  "Early Modern Era (1500 - 1900 CE)",
  "Modern Era (1900+ CE)",
] as const;

export function matchesTimelineEra(item: Monument, filter: string) {
  if (filter === "All Eras") return true;
  return item.era ===
    (filter.includes("Ancient")
      ? "Ancient Era"
      : filter.includes("Classical")
        ? "Classical Era"
        : filter.includes("Medieval")
          ? "Medieval Era"
          : filter.includes("Early Modern")
            ? "Early Modern Era"
            : "Modern Era");
}
