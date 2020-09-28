import React from "react";

import { connect, ConnectedProps } from "react-redux";

import { State } from "./types";
import { LibraryPicker } from "./components/modals/LibraryPicker";
import { Topbar } from "./components/Topbar";
import { Grid } from "./components/Grid";

const mapState = ({ library, album }: State) => ({
  library,
  album,
});
const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function App(props: Props) {
  if (!props.library) {
    return <LibraryPicker></LibraryPicker>;
  }
  return (
    <>
      <Topbar libraryName={props.library!.name} albumName={props.album?.name}/>
      <Grid libraryId={props.library.id} media={props.library.media}/>
    </>
  );
}

export default connector(App);
