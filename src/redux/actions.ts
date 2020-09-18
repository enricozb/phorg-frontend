export const BLANK_ACTION = "blank_action";

interface BlankAction {
  type: typeof BLANK_ACTION;
  payload: string;
}

export type Action = BlankAction;
