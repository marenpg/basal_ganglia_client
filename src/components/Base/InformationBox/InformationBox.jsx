import React from "react";

import {
  Box,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from "@material-ui/core";

import { ChevronRight as ChevronRightIcon } from "@material-ui/icons";

import PaperDark from "../../Base/PaperDark";

export const InformationItem = ({ title, val, classes }) => (
  <TableRow className={classes.tableRow}>
    <TableCell component="th" scope="row">
      {title}:
    </TableCell>
    <TableCell>{val ? val : "-"}</TableCell>
  </TableRow>
);

export const InformationListLinkItem = ({ to, text, classes }) => (
  <TableRow component="a" href={to} hover>
    <TableCell component="th" scope="row">
      {text}:
    </TableCell>
    <TableCell>
      <ChevronRightIcon color="primary" />
    </TableCell>
  </TableRow>
);

export const InformationBox = ({ classes, title, children }) => {
  return (
    <Box mt={2} mb={2}>
      <Container maxWidth="md">
        <PaperDark square className={classes.InformationBox}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
          >
            {title}
          </Typography>
          <Box mt={2} className={classes.scrollBox}>
            <Table size="small">
              <TableBody>{children}</TableBody>
            </Table>
          </Box>
        </PaperDark>
      </Container>
    </Box>
  );
};
