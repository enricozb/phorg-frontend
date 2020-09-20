export interface State {
  library: Library | null;
  album: Album | null;
};

export interface Library {
  id: string;
  name: string;
  path: string;
};

export interface Album {
  id: string;
  name: string;
};

export interface Media {
  id: string;
}
