import React, { useEffect, useRef, useState } from "react";

import useSWR from "swr";

import "../utils/extensions.ts";
import { useMousetrap } from "../utils/mousetrap";
import { fetcher } from "../api/requests";
import { guid, Library } from "../types";
import { Thumbnail } from "./Thumbnail";
import "../css/Grid.css";

interface Props {
  libraryId: guid;
}

export function Grid(props: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  const bindKeys = useMousetrap();
  const [cursor, setCursor] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // 160px are the fixed dimensions of thumbnails. Zoom might break this?
  const getNumCols = () =>
    Math.floor(gridRef.current!.getBoundingClientRect().width / 160);
  const clampCursor = (cursor: number) => Math.max(0, Math.min(30, cursor));

  useEffect(() => {
    return bindKeys({
      h: () => setCursor((c) => clampCursor(c - 1)),
      j: () => setCursor((c) => clampCursor(c + getNumCols())),
      k: () => setCursor((c) => clampCursor(c - getNumCols())),
      l: () => setCursor((c) => clampCursor(c + 1)),
      m: () => setSelected((selected) => selected.symDiff(new Set([cursor]))),
    });
  }, [cursor, bindKeys]);

  const { data: library, error } = useSWR<Library>(
    `/api/libraries/${props.libraryId}`,
    fetcher
  );

  if (error) return <div className="grid empty">Error loading media</div>;
  if (!library) return <div className="grid empty">Loading...</div>;

  if (Object.keys(library.media.items).length === 0) {
    return (
      <div className="grid empty">
        There doesn't seem to be anything here...
      </div>
    );
  }

  // sort media by timestamp (earliest first)
  const mediaEntries = Object.entries(
    library.media.items
  ).sort(([id1, e1], [id2, e2]) => e1.timestamp.localeCompare(e2.timestamp));

  return (
    <div ref={gridRef} className="grid">
      {mediaEntries.map(([id, mediaEntry], i) => (
        <Thumbnail
          key={i}
          cursor={cursor === i}
          selected={selected.has(i)}
          libraryId={library.id}
          mediaId={id}
        />
      ))}
    </div>
  );
}
