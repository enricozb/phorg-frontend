import React from "react";

import useSWR from "swr";
import { connect, ConnectedProps } from "react-redux";

import { Library } from "../../types";
import { setLibrary } from "../../redux/actions";
import { Modal } from "./Modal";
import { fetcher } from "../../api/swr";

const mapDispatch = {
  setLibrary,
};

const connector = connect(null, mapDispatch);
type Props = ConnectedProps<typeof connector>;

function LibraryPickerImpl(props: Props) {
  const { data: libraries, error } = useSWR<Library[]>("/libraries", fetcher);

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

  if (libraries.length === 1) {
  }

  return (
    <Modal title="Pick a Library" onRequestHide={null}>
      Modal text
    </Modal>
  );
}

export const LibraryPicker = connector(LibraryPickerImpl);
