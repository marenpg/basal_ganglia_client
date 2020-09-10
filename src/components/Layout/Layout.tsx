import React, { useState } from "react";
import classNames from "classnames";

import { AppBar, Toolbar, Typography, Link, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import { MenuDrawer } from "./MenuDrawer";
import { StyleProps } from "./Layout.jss";

const Layout: React.FC<StyleProps> = ({ classes, children }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <AppBar className={classNames(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            aria-label="Open drawer"
            onClick={() => setDrawerOpen(true)}
            className={classNames(classes.menuButton)}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography
              component="h1"
              variant="h5"
              color="primary"
              noWrap
              className={classes.title}
            >
              Basal Ganglia Data
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <MenuDrawer
        classes={classes}
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        handleMenuItemClick={() => setDrawerOpen(false)}
      />
      <main className={classes.content}>{children}</main>
    </>
  );
};

export default Layout;
