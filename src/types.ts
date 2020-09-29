// REST types

export type guid = string;
export type burst_id = string;
export type content_id = string;

export interface LibraryMedia {
  items: Record<guid, Media>;
  burst_id: Record<burst_id, guid[]>;
  content_id: Record<content_id, guid[]>;
}

export interface Library {
  id: string;
  name: string;
  albums: Album[];
  media: LibraryMedia;
}

export type LibraryPreview = Pick<Library, "id" | "name">;

export interface Album {
  id: string;
  name: string;
}

export interface Media {
  filename: string;
  timestamp: string;
  burst_id: string;
  content_id: string;
}

export interface ImportStatus {
  ongoing: boolean;
  complete: boolean;
  percentage: number;
  message: string;
  errors: string[];
  media: Record<string, Media>;
}

// redux

export interface State {
  library: Library | null;
  album: Album | null;
}

export const SET_LIBRARY_PREVIEW = "SET_LIBRARY_PREVIEW";

interface SetLibraryPreviewAction {
  type: typeof SET_LIBRARY_PREVIEW;
  library: LibraryPreview;
}

export type Action = SetLibraryPreviewAction;
