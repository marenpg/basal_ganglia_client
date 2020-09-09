import React from "react";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";

import { StyleProps } from "./BgTable.jss";
import { BgLinkTableProps, SortableTableHeaderProps } from "./types";

export const BgTable: React.FC<StyleProps> = ({ children, classes }) => (
  <Box mt={4} className={classes.scrollBox}>
    <Table size="small">
      {children}
    </Table>
  </Box>
);

export const BgLinkTable: React.FC<BgLinkTableProps> = ({
  classes,
  orderBy,
  order,
  handleSortRequest,
  headers,
  rows,
  onClick
}) => {
  const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({ val, text }) => (
    <TableCell key={`${val}-${text}`} sortDirection={orderBy === val ? order : false}>
      <Tooltip title={`Sort on ${text.toLowerCase()}`} placement="bottom-start" enterDelay={300}>
        <TableSortLabel
          active={orderBy === val}
          direction={order}
          onClick={handleSortRequest(val)}
        >
          {text}
        </TableSortLabel>
      </Tooltip>
    </TableCell>
  );

  return (
    <Box className={classes.scrollBox}>
      <Table size="small">
        {headers ? (
          <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <React.Fragment key={`${header.text}-${i}`}>
                  {header.val ? (
                    <SortableTableHeader val={header.val} text={header.text} />
                  ) : (
                      <TableCell>{header.text}</TableCell>
                    )}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {rows.map(row => (
            <TableRow hover key={row.link} className={classes.tableRow}>
              {row.cells.map((cell, i) => (
                <TableCell key={`${headers[i].text}-${cell.text}`} className={classes.tableCell}>
                  {onClick ? (
                    <Link
                      component="button"
                      color="textPrimary"
                      variant="inherit"
                      onClick={onClick(row.id)}
                      className={classes.tableLink}
                    >
                      {cell.text ? cell.text : "-"}
                    </Link>
                  ) : (
                      <Link
                        href={row.link}
                        color="textPrimary"
                        variant="inherit"
                        className={classes.tableLink}
                      >
                        {cell.text ? cell.text : "-"}
                      </Link>
                    )}

                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
