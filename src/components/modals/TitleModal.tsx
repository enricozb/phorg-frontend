import React, { FunctionComponent } from "react";

import { CardModal } from "./CardModal";

import { Typography } from "@material-ui/core";

import { ModalProps } from "./Modal";

export const TitleModal: FunctionComponent<{ title: string } & ModalProps> = ({
  onRequestHide,
  title,
  children,
}) => (
  <CardModal onRequestHide={onRequestHide}>
    <Typography variant="h4">{title}</Typography>
    {children}
  </CardModal>
);
