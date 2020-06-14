import React from "react";
import { NavLink, Link } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Container
} from "@material-ui/core";
import { ChevronRight as ChevronRightIcon } from "@material-ui/icons";

import LightDivider from "../Base/LightDivider";
import { MenuDrawerProps, MenuDrawerListItemProps } from "./types";

const MenuDrawerListItem: React.FC<MenuDrawerListItemProps> = ({ to, text, handleMenuItemClick, classes }) => (
  <ListItem
    button
    component={NavLink}
    to={to}
    className={classes.drawerListItem}
    activeClassName={classes.drawerListItemActive}
    onClick={handleMenuItemClick}
  >
    <ListItemIcon>
      <ChevronRightIcon className={classes.icon} />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ classes, handleMenuItemClick, ...props }) => (
  <Drawer
    classes={{
      paper: classes.drawerPaper
    }}
    {...props}
  >
    <div>
      <Container className={classes.drawerTitleContainer}>
        <Typography component={Link} variant="h5" to="/" color="primary">
          Basal Ganglia Data
        </Typography>
      </Container>
      <LightDivider />
      <List component="nav" aria-label="Main menu">
        <MenuDrawerListItem
          to="/cell-types"
          text="Cells"
          classes={classes}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuDrawerListItem
          to="/brain-regions"
          text="Brain Regions"
          classes={classes}
          handleMenuItemClick={handleMenuItemClick}
        />
        <MenuDrawerListItem
          to="/experiments"
          text="Experiments"
          classes={classes}
          handleMenuItemClick={handleMenuItemClick}
        />
      </List>
      <LightDivider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button className={classes.drawerListItem}>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button className={classes.drawerListItem}>
          <ListItemText primary="Test" />
        </ListItem>
      </List>
    </div>
  </Drawer>
);