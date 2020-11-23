import React, { FunctionComponent } from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

import { Modal } from "./Modal";

export const CardModal: FunctionComponent<{}> = ({ children }) => (
  <Modal>
    <Card>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  </Modal>
);
