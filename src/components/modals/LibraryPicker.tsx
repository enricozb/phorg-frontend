import React from "react";

import useSWR from "swr";
import { connect, ConnectedProps } from "react-redux";

import { Library } from "../../types";
import { setLibrary } from "../../redux/actions";
import { Modal } from "./Modal";
import { fetcher } from "../../api/swr";
import { openPathDialog } from "../../utils/electron";

const mapDispatch = {
  setLibrary,
};

const connector = connect(null, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function LibraryPickerImpl(props: Props) {
  const { data: libraries, error } = useSWR<Library[]>(
    "/api/libraries",
    fetcher
  );

  if (error) {
    return (
      <Modal title="Error Loading Libraries" onRequestHide={null}>
        {error.message}
      </Modal>
    );
  }

  if (!libraries) {
    return (
      <Modal title="Pick a Library" onRequestHide={null}>
        loading...
      </Modal>
    );
  }

  if (libraries.length === 0) {
    return (
      <Modal title="Create your first Library" onRequestHide={null}>
        <div>
          <p>Name</p>
          <input type="text" />
          <p>Path</p>
          <button onClick={openPathDialog}>Library Path</button>
        </div>
      </Modal>
    );
  }

  if (libraries.length === 1) {
  }

  return (
    <Modal title="Pick a Library" onRequestHide={null}>
      Modal text
    </Modal>
  );
}

export const LibraryPicker = connector(LibraryPickerImpl);
