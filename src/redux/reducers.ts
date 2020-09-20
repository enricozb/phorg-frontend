import { Action } from "./actions";
import { Album, Library } from "../types";

const initialState = {
  library: null as Library | null,
  album: null as Album | null,
};

export const reducer = (state = initialState, action: Action) => {
  return state;
};
