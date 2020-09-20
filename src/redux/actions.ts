import { Action, SET_LIBRARY, Library } from "../types";

export function setLibrary(library: Library): Action {
  return {
    type: SET_LIBRARY,
    library
  }
}
