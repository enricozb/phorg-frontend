import React, { FunctionComponent } from "react";

import { CardModal } from "./CardModal";

import { Typography } from "@material-ui/core";

export const TitleModal: FunctionComponent<{ title: string }> = ({
  title,
  children,
}) => (
  <CardModal>
    <Typography variant="h4">{title}</Typography>
    {children}
  </CardModal>
);
