// REST types

export interface Library {
  id: string;
  name: string;
  albums: Album[];
  media: Media[];
}

export interface Album {
  id: string;
  name: string;
}

export interface Media {
  id: string;
}

export interface ImportStatus {
  ongoing: boolean;
  precentage: number;
  message: string;
  errors: string[];
}

// redux

export interface State {
  library: Library | null;
  album: Album | null;
}

export const SET_LIBRARY = "SET_LIBRARY";

interface SetLibraryAction {
  type: typeof SET_LIBRARY;
  library: Library;
}

export type Action = SetLibraryAction;
