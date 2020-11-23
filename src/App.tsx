import React from "react";

import { LibraryPreview } from "./types";
import { LibraryPicker } from "./components/modals/LibraryPicker";
import { Topbar } from "./components/Topbar";
import { Grid } from "./components/Grid";

export default function App() {
  const [library, setLibrary] = React.useState<LibraryPreview | null>(null);

  if (!library) {
    return <LibraryPicker setLibrary={setLibrary}></LibraryPicker>;
  }

  return (
    <>
      <Topbar library={library} albumName={"Replace This Album Name"} />
      <Grid libraryId={library.id} />
    </>
  );
}
