import React from "react";
import {
  Drawer,
  Link,
  IconButton,
} from "@material-ui/core";
import { Cancel as CancelIcon, Fullscreen as FullscreenIcon } from "@material-ui/icons";
import { StyleProps } from "./CloseableDrawer.jss";

interface CloseableDrawerProps extends StyleProps {
  open: boolean;
  handleDrawerChange: (open: boolean) => void;
  fullscreenLink?: string;
}

export const CloseableDrawer: React.FC<CloseableDrawerProps> = (
  { classes, open, handleDrawerChange, fullscreenLink, children }) => (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
      onClose={() => handleDrawerChange(false)}
    >
      <IconButton
        aria-label="Close"
        color="primary"
        className={classes.closeButton}
        onClick={() => handleDrawerChange(false)}
      >
        <CancelIcon />
      </IconButton>
      {fullscreenLink &&
        <IconButton
          component={Link}
          href={fullscreenLink}
          aria-label="Fullscreen"
          color="primary"
          className={classes.fullscreenLink}
          onClick={() => handleDrawerChange(false)}
        >
          <FullscreenIcon />
        </IconButton>
      }

      {children}
    </Drawer>
  );
