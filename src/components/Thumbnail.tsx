import React from "react";

import { scrollToCenter } from "../utils/scroll";
import { guid } from "../types";
import { Modal } from "./modals/Modal";
import "../css/Thumbnail.css";

interface Props {
  focused: boolean;
  cursor: boolean;
  selected: boolean;
  mediaId: guid;
  libraryId: guid;
}

export function Thumbnail(props: Props) {
  return (
    <>
      {props.focused && <MediaModal {...props} />}
      <div
        ref={(ref) => {
          if (ref && props.cursor) {
            scrollToCenter(ref);
          }
        }}
        className={`thumbnail ${props.selected ? "selected" : ""} ${
          props.cursor ? "cursor" : ""
        }`}
      >
        <img
          alt={`Media identified by the following guid: ${props.mediaId}`}
          src={`/api/thumb/${props.libraryId}/${props.mediaId}`}
        />
      </div>
    </>
  );
}

function MediaModal(props: Pick<Props, "libraryId" | "mediaId">) {
  return (
    <Modal>
      <img
        className="media-preview"
        src={`/api/media/${props.libraryId}/${props.mediaId}`}
      />
    </Modal>
  );
}
