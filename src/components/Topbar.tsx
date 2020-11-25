import React from "react";

import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import { LibraryPreview } from "../types";
import { ImportButton } from "./Import";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flex: 1,
      color: "white",
    },
  })
);

interface Props {
  library: LibraryPreview;
  albumName?: string;
}

export function Topbar(props: Props) {
  const classes = useStyles();

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit">
          <MenuIcon />
        </IconButton>
        <Breadcrumbs className={classes.title}>
          <Typography variant="subtitle1">{props.library.name}</Typography>
          <Typography variant="subtitle1">{props.albumName}</Typography>
        </Breadcrumbs>
        <ImportButton libraryId={props.library.id} />
      </Toolbar>
    </AppBar>
  );
}
