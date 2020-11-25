import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { LibraryPreview } from "./types";
import { LibraryPicker } from "./components/modals/LibraryPicker";
import { Topbar } from "./components/Topbar";
import { Grid } from "./components/Grid";

export default function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  const [library, setLibrary] = React.useState<LibraryPreview | null>(null);

  if (!library) {
    return <LibraryPicker setLibrary={setLibrary}></LibraryPicker>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Topbar library={library} albumName={"Replace This Album Name"} />
      <Grid libraryId={library.id} />
    </ThemeProvider>
  );
}
