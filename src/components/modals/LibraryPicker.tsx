import React, { useState, ChangeEvent } from "react";

import axios from "axios";
import { connect, ConnectedProps } from "react-redux";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

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
  const [name, setName] = useState("");

  const createLibrary = async () => {
    const path = await openPathDialog();
    if (path.canceled || name.length === 0) {
      return;
    }

    const library: Library = {
      id: uuidv4(),
      name,
      path: path.filePaths[0],
    };

    await axios.post("/api/libraries", { library });
    props.setLibrary(library);
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
          <input
            type="text"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setName(e.target.value);
            }}
          />
          <p>Path</p>
          <button onClick={createLibrary}>Pick a Library Path</button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal title="Select a Library" onRequestHide={null}>
      {libraries.map((library, i) => (
        <li key={i}>
          <button onClick={() => props.setLibrary(library)}>{library.name}</button>
        </li>
      ))}
    </Modal>
  );
}

export const LibraryPicker = connector(LibraryPickerImpl);
