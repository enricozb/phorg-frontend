import React from "react";

import theme from "@rebass/preset";
import { ThemeProvider } from "theme-ui";

import { LibraryPreview } from "./types";
import { LibraryPicker } from "./components/modals/LibraryPicker";
import { Topbar } from "./components/Topbar";
import { Grid } from "./components/Grid";

export default () => <ThemeProvider theme={theme}><App/></ThemeProvider>;

function App() {
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
