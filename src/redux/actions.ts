import { Action, SET_LIBRARY_PREVIEW, LibraryPreview } from "../types";

export function setLibraryPreview(library: LibraryPreview): Action {
  return {
    type: SET_LIBRARY_PREVIEW,
    library,
  };
}
