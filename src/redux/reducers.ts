import { Action, Album, Library } from "../types";
import { SET_LIBRARY } from "../types";

const initialState = {
  library: null as Library | null,
  album: null as Album | null,
};

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_LIBRARY:
      return {...state, library: action.library};
  }
  return state;
};
