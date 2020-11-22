import React, { FunctionComponent } from "react";

import { Card, Heading } from "rebass";

import { Modal } from "./Modal";

export const CardModal: FunctionComponent<{}> = ({ children }) => (
  <Modal>
    <Card
      sx={{
        borderRadius: 3,
      }}
    >
      <Heading>I'm a card modal!</Heading>
      {children}
    </Card>
  </Modal>
);
