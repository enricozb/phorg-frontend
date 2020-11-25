import React, { FunctionComponent } from "react";

import { Card, CardContent } from "@material-ui/core";

import { Modal, ModalProps } from "./Modal";

export const CardModal: FunctionComponent<ModalProps> = ({ children, onRequestHide }) => (
  <Modal onRequestHide={onRequestHide}>
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </Modal>
);
