import React from "react";

import axios from "axios";
import { connect, ConnectedProps } from "react-redux";
import useSWR, { mutate } from "swr";

import { Library } from "../../types";
import { setLibrary } from "../../redux/actions";
import { Modal } from "./Modal";
import { fetcher } from "../../api/requests";
import { openPathDialog } from "../../utils/electron";

const mapDispatch = {
  setLibrary,
};

const connector = connect(null, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function LibraryPickerImpl(props: Props) {
  const createLibrary = async () => {
    const path = await openPathDialog();
    if (path.canceled) {
      return;
    }

    await axios.post("/api/libraries", {});

    console.log(path.filePaths[0]);
  };

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
          <button onClick={createLibrary}>Pick a Library Path</button>
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
