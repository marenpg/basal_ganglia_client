import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  TableContainer,
  TablePagination,
  Paper
} from "@material-ui/core";


import { BgCollapseTableProps, SortableTableHeaderProps, TableRow as TableRowData, CollapseTableRow } from "./types";
import { CollapseRow, RegularRow } from ".";

export const BgCollapseTable: React.FC<BgCollapseTableProps> = ({
  classes,
  orderBy,
  order,
  handleSortRequest,
  headers,
  rows,
  onClick
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [visibleRows, setVisibleRows] = useState<TableRowData[]>([]);
  const [visibleCollapseRows, setVisibleCollapseRows] = useState<CollapseTableRow[]>([]);

  useEffect(() => {
    setPage(0)
  }, [rows]);

  useEffect(() => {
    if (rows.length > 0 && "subRows" in rows[0]) {
      setVisibleCollapseRows(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
      return;
    }
    setVisibleRows(rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
  }, [page, rows, rowsPerPage]);

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
          {headers ? (
            <TableHead>
              <TableRow>
                {visibleCollapseRows.length > 0 ? <TableCell /> : null}
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
          ) : null}
          <TableBody>
            {visibleCollapseRows.map(row => {
              if ("subRows" in row) {
                return <CollapseRow key={row.id} row={row} classes={classes} headers={headers} />
              }
            })}
            {visibleRows.map(row => (
              <RegularRow key={row.id} row={row} classes={classes} headers={headers} onClick={onClick} />
            ))}

            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={8} />
              </TableRow>
            )} */}
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

