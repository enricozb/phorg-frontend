import { Action, Album, LibraryPreview } from "../types";
import { SET_LIBRARY_PREVIEW } from "../types";

const initialState = {
  library: null as LibraryPreview | null,
  album: null as Album | null,
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LIBRARY_PREVIEW:
      return {...state, library: action.library};
  }
  return state;
};
