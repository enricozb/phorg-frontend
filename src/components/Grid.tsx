import React, { useCallback, useEffect, useRef, useState } from "react";

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
  const { focused, cursor, selected } = useKeys(gridRef);
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
  ).sort(([, e1], [, e2]) => e1.timestamp.localeCompare(e2.timestamp));

  return (
    <div ref={gridRef} className="grid">
      {mediaEntries.map(([id], i) => (
        <Thumbnail
          key={i}
          focused={cursor === i && focused}
          cursor={cursor === i}
          selected={selected.has(i)}
          libraryId={library.id}
          mediaId={id}
        />
      ))}
    </div>
  );
}

function useKeys(gridRef: React.RefObject<HTMLDivElement>) {
  const [anchor, setAnchor] = useState<number | null>(null);
  const [focused, setFocused] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [anchorSelection, setAnchorSelection] = useState<Set<number>>(
    new Set()
  );
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const bindKeys = useMousetrap();

  // 160px are the fixed dimensions of thumbnails. Zoom might break this?
  const getNumCols = useCallback(
    () => Math.floor(gridRef.current!.getBoundingClientRect().width / 160),
    [gridRef]
  );
  const clampCursor = (cursor: number) =>
    Math.max(0, Math.min(gridRef.current!.childNodes.length - 1, cursor));

  const moveCursor: Record<string, (cursor: number) => number> = {
    h: (c) => clampCursor(c - 1),
    j: (c) => clampCursor(c + getNumCols()),
    k: (c) => clampCursor(c - getNumCols()),
    l: (c) => clampCursor(c + 1),
  };

  useEffect(() => {
    const clearAnchorSelection = () => {
      setAnchor(null);
      setAnchorSelection(new Set());
    };

    const flushAnchorSelection = () => {
      setSelected((selected) => selected.union(anchorSelection));
      clearAnchorSelection();
    };

    // for each movement key, we also have shift keys for selection
    const movementKeyMap = {
      ...Object.entries(moveCursor).reduce(
        (keyMap, [key, cursorFunc]) => ({
          ...keyMap,
          [key]: () => {
            setCursor(cursorFunc);
            flushAnchorSelection();
          },
          [`shift+${key}`]: () => {
            const newCursor = cursorFunc(cursor);

            if (anchor === null) {
              setAnchor(cursor);
              setAnchorSelection(Set.range(cursor, newCursor));
            } else {
              setAnchorSelection(Set.range(anchor, newCursor));
            }

            setCursor(newCursor);
          },
        }),
        {}
      ),
    };

    const additionalKeyMap = {
      m: () => {
        flushAnchorSelection();
        setSelected((selected) =>
          selected.union(anchorSelection).symDiff(new Set([cursor]))
        );
      },
      enter: () => {
        setFocused(true);
        setSelected(new Set());
        clearAnchorSelection();
      },
      esc: () => {
        setFocused(false);
        setSelected(new Set());
        clearAnchorSelection();
      },
    };

    return bindKeys({ ...movementKeyMap, ...additionalKeyMap });
  }, [anchor, anchorSelection, cursor, moveCursor, bindKeys, getNumCols]);

  return { focused, cursor, selected: selected.union(anchorSelection) };
}
