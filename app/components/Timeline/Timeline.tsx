"use client";

import { useMemo, useState } from "react";
import type { Monument } from "../../types/monument";
import { matchesTimelineEra } from "../../data/timeline";
import TimelineItem from "./TimelineItem/TimelineItem";
import TimelineTabs from "./TimelineTabs";
import styles from "./Timeline.module.css";

interface TimelineProps {
  items: Monument[];
  onOpen: (id: string) => void;
}

export default function Timeline({
  items,
  onOpen,
}: TimelineProps) {
  const [filter, setFilter] = useState("All Eras");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      matchesTimelineEra(item, filter)
    );
  }, [items, filter]);

  return (
    <section id="timeline" className={styles.section}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.container}>
        <header className={styles.heading}>
          <p>CHRONOLOGY OF CIVILIZATION</p>

          <h2>
            HISTORICAL <em>TIMELINE</em>
          </h2>

          <span>
            Select an era to filter monuments created during pivotal
            periods in human history.
          </span>
        </header>

        <TimelineTabs
          active={filter}
          onChange={setFilter}
        />

        <div className={styles.timelineArea}>
          <div className={styles.rail} aria-hidden="true" />

          <div className={styles.items}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TimelineItem
                  key={item.id}
                  item={item}
                  onOpen={onOpen}
                />
              ))
            ) : (
              <div className={styles.empty}>
                No monuments match this era.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
