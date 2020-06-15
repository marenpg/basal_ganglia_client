import React, { useState, useEffect } from "react";
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Collapse,
  TableContainer,
  TablePagination,
  Paper,
  IconButton
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { BgCollapseTableProps, SortableTableHeaderProps, CollapseRowProps, TableRow as TableRowData } from "./types";
import { BgLinkTable } from ".";

// TODO MAKE PAGINATION
export const BgCollapseTable: React.FC<BgCollapseTableProps> = ({
  classes,
  orderBy,
  order,
  handleSortRequest,
  headers,
  rows,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [visibleRows, setVisibleRows] = useState<TableRowData[]>([])

  useEffect(() => { setPage(0) }, [rows])

  useEffect(() => {
    setVisibleRows(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  }, [page, rows, rowsPerPage])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

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
      <TableContainer component={Paper}>
        <Table size="small">
          {headers && (
            <TableHead>
              <TableRow>
                <TableCell />
                {headers.map(header => (
                  <React.Fragment key={header.text}>
                    {header.val ? (
                      <SortableTableHeader val={header.val} text={header.text} />
                    ) : (
                        <TableCell>{header.text}</TableCell>
                      )}
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {visibleRows.map(row => (
              <CollapseRow key={row.id} row={row} classes={classes} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  );
};

const CollapseRow: React.FC<CollapseRowProps> = ({ classes, row }) => {
  const [open, setOpen] = React.useState(false);

  return <>
    <TableRow hover className={`${classes.tableRow} ${classes.collapseRow}`}>
      <TableCell>
        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
      {row.cells.map((cell, i) => (
        <TableCell key={`${row.id}-${i}-${cell.text}`} className={classes.tableCell} onClick={() => setOpen(!open)}>
          <Link
            component="button"
            color="textPrimary"
            variant="inherit"

            className={classes.tableLink}
          >
            {cell.text ? cell.text : "-"}
          </Link>
        </TableCell>
      ))}
    </TableRow>
    {row.subRows &&
      < TableRow >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
            </Typography> */}
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