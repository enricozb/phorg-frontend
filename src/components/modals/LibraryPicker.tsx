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
import { ReactComponent as PlusSVG } from "../../img/plus.svg";

const mapDispatch = {
  setLibrary,
};

const connector = connect(null, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function LibraryPickerImpl(props: Props) {
  const [name, setName] = useState("");
  const [newLibrary, setNewLibrary] = useState(false);

  const createLibrary = async () => {
    const path = await openPathDialog();
    if (path.canceled || name.length === 0) {
      return;
    }

    const library: Library = {
      id: uuidv4(),
      name,
      albums: [],
      media: [],
    };

    await axios.post("/api/libraries", {
      path: path.filePaths[0],
      library,
    });
    props.setLibrary(library);
  };

  const pickLibraryComponent = (title: string) => {
    return (
      <Modal title={title} onRequestHide={() => setNewLibrary(false)}>
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
  };

  const addLibraryButton = (
    <button className="icon" onClick={() => setNewLibrary(true)}>
      <PlusSVG />
    </button>
  );

  const { data: libraries, error } = useSWR<Library[]>(
    "/api/libraries",
    fetcher
  );

  if (error) {
    return <Modal title="Error Loading Libraries">{error.message}</Modal>;
  }

  if (!libraries) {
    return <Modal title="Pick a Library">loading...</Modal>;
  }

  if (libraries.length === 0) {
    return pickLibraryComponent("Create your First Library");
  }

  if (newLibrary) {
    return pickLibraryComponent("Create a New Library");
  }

  return (
    <Modal title="Select a Library" rightButton={addLibraryButton}>
      {libraries.map((library, i) => (
        <li key={i}>
          <button onClick={() => props.setLibrary(library)}>
            {library.name}
          </button>
        </li>
      ))}
    </Modal>
  );
}

export const LibraryPicker = connector(LibraryPickerImpl);
