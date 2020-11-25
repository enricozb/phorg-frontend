import React, { useEffect, useState } from "react";

import axios from "axios";
import useSWR, { mutate } from "swr";

import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Modal } from "./modals";
import { guid, ImportStatus, Socket } from "../types";
import {
  multiselectPathsDialog,
  onImportStatusUpdate,
} from "../utils/electron";
import { fetcher } from "../api/requests";
import "../css/Import.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      width: 100,
    },
    errorModal: {
      background: "white",
    },
    errorButton: {
      "&:hover": {
        color: "white",
        background: theme.palette.error.light,
      },
      color: "white",
      background: theme.palette.error.dark,
      marginRight: theme.spacing(2),
    },
    errorIcon: {
      marginRight: theme.spacing(2),
    },
  })
);

export function ImportButton(props: { libraryId: guid }) {
  const classes = useStyles();

  const [showingErrors, setShowingErrors] = useState(false);
  const [importStatus, setImportStatus] = useState({
    ongoing: false,
    complete: false,
    percentage: 0,
    message: "",
    errors: [],
    media: {},
  } as ImportStatus);

  const { data: socket, error } = useSWR<Socket>("/api/connect", fetcher);

  useEffect(() => {
    if (socket) {
      onImportStatusUpdate(socket.path, async (status: ImportStatus) => {
        if (status.complete) {
          setImportStatus({ ...status, ongoing: true });

          // delay the final message by a second so the progress bar shows completion
          setTimeout(() => setImportStatus(status), 1000);

          await axios.post("/api/media", {
            libraryId: props.libraryId,
            media: status.media,
          });

          mutate(`/api/libraries/${props.libraryId}`);
        } else {
          setImportStatus(status);
        }
      });
    }
  }, [props.libraryId, socket]);

  if (error) {
    return null;
  }

  const hasErrors = importStatus.errors.length > 0;

  if (hasErrors) {
    return (
      <>
        {showingErrors && (
          <ErrorModal
            errors={importStatus.errors}
            onRequestHide={() => setShowingErrors(false)}
          />
        )}
        <Button
          variant="contained"
          className={classes.errorButton}
          onClick={() => setShowingErrors(true)}
        >
          View Errors
        </Button>
      </>
    );
  }

  if (importStatus.ongoing) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Typography variant="caption">Test</Typography>
        </Box>
        <Box>
          <LinearProgress
            color="secondary"
            className={classes.progress}
            variant="determinate"
            value={importStatus.percentage}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Button
      onClick={async () => {
        const { canceled, filePaths } = await multiselectPathsDialog();
        if (!canceled) {
          await axios.post("/api/import", {
            libraryId: props.libraryId,
            paths: filePaths,
          });
        }
      }}
    >
      import
    </Button>
  );
}

interface ErrorModalProps {
  errors: string[];
  onRequestHide: () => void;
}

function ErrorModal(props: ErrorModalProps) {
  const classes = useStyles();

  return (
    <Modal onRequestHide={props.onRequestHide}>
      <TableContainer
        component={Paper}
        style={{ boxSizing: "border-box", maxHeight: 400, overflow: "auto" }}
      >
        <Table className={classes.errorModal} size="small">
          <TableHead>
            <TableRow>
              <TableCell>File</TableCell>
              <TableCell>Error</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.errors.map((error, i) => (
              <TableRow key={i}>
                <TableCell>foo.png</TableCell>
                <TableCell>{error}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Modal>
  );
}
