import React from "react";

import useSWR from "swr";

import { fetcher } from "../api/requests";
import { guid, Library } from "../types";
import { Thumbnail } from "./Thumbnail";
import "../css/Grid.css";

interface Props {
  libraryId: guid;
}

export function Grid(props: Props) {
  const { data: library, error } = useSWR<Library>(
    `/api/libraries/${props.libraryId}`,
    fetcher
  );

  if (error) {
    return <div className="grid empty">Error loading media</div>;
  }

  if (!library) {
    return <div className="grid empty">Loading...</div>;
  }

  if (Object.keys(library.media.items).length === 0) {
    return (
      <div className="grid empty">
        There doesn't seem to be anything here...
      </div>
    );
  }

  const mediaEntries = Object.entries(
    library.media.items
  ).sort(([id1, e1], [id2, e2]) => e1.timestamp.localeCompare(e2.timestamp));

  return (
    <div className="grid">
      {mediaEntries.map(([id, mediaEntry], i) => (
        <Thumbnail key={i} libraryId={library.id} mediaId={id} />
      ))}
    </div>
  );
}
