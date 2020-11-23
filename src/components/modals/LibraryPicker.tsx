import React, { useState, ChangeEvent } from "react";

import axios from "axios";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

import { List, ListItem } from "@material-ui/core";

import { LibraryPreview } from "../../types";
import { TitleModal, Modal } from "./";
import { fetcher } from "../../api/requests";
import { openPathDialog } from "../../utils/electron";

type Props = {
  setLibrary: (library: LibraryPreview) => void;
};

export function LibraryPicker(props: Props) {
  const [name, setName] = useState("");
  const [newLibrary, setNewLibrary] = useState(false);

  const createLibrary = async () => {
    const path = await openPathDialog();
    if (path.canceled || name.length === 0) {
      return;
    }

    const library: LibraryPreview = {
      id: uuidv4(),
      name,
    };

    await axios.post("/api/libraries", {
      path: path.filePaths[0],
      library,
    });

    props.setLibrary(library);
  };

  const createLibraryComponent = (title: string) => {
    return (
      <Modal onRequestHide={() => setNewLibrary(false)}>
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

  const { data: libraries, error } = useSWR<LibraryPreview[]>(
    "/api/libraries",
    fetcher
  );

  if (error) {
    return <Modal>{error.message}</Modal>;
  }

  if (!libraries) {
    return <Modal>loading...</Modal>;
  }

  if (libraries.length === 0) {
    return createLibraryComponent("Create your First Library");
  }

  if (newLibrary) {
    return createLibraryComponent("Create a New Library");
  }

  return (
    <TitleModal title="Select a Library">
      <List component="nav">
        {libraries.map((library, i) => (
          <ListItem button onClick={() => props.setLibrary(library)} key={i}>
            {library.name}
          </ListItem>
        ))}
      </List>
    </TitleModal>
  );
}
