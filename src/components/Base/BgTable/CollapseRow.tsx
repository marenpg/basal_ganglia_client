import React from "react";
import { TableRow, TableCell, IconButton, Collapse, Box, Link } from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { CollapseRowProps } from "./types";
import { BgLinkTable } from ".";

export const CollapseRow: React.FC<CollapseRowProps> = ({ classes, headers, row }) => {
  const [open, setOpen] = React.useState(false);

  if (row.subRows?.length === 1) {
    const link = row.subRows[0].link;
    return <TableRow hover key={row.link} className={classes.tableRow}>
      <TableCell />
      {row.cells.map((cell, i) => (
        <TableCell key={`${headers[i].text}-${row.id}-${cell.text}`} className={classes.tableCell}>
          <Link
            href={link}
            target="_blank"
            color="textPrimary"
            variant="inherit"
            className={classes.tableLink}
          >
            {cell.text ? cell.text : "-"}
          </Link>
        </TableCell>
      ))}
    </TableRow>
  }

  return <>
    <TableRow hover className={`${classes.tableRow} ${classes.collapseRow}`}>
      <TableCell className={classes.iconCell}>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      {row.cells.map((cell, i) => (
        <TableCell key={`${row.id}-${i}-${cell.text}`} className={classes.tableCell} onClick={() => setOpen(!open)}>
          <Link
            component="button"
            color="textPrimary"
            variant="body1"
            className={classes.tableLink}
          >
            {cell.text ? cell.text : "-"}
          </Link>
        </TableCell>
      ))}
    </TableRow>
    {row.subRows &&
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box ml={8} mr={5} mt={1}>
              <BgLinkTable
                orderBy=""
                order="asc"
                handleSortRequest={null}
                headers={row.subHeaders ?? [{ text: "", val: "" }]}
                rows={row.subRows}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    }
  </>;
};