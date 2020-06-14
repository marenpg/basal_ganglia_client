import React from "react";

import {
  Fab,
  TableCell,
  Tooltip,
  TableSortLabel
} from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

import { BgSortableTableCellProps, BgLinkTableCellProps } from "./types";

export const BgSortableTableCell: React.FC<BgSortableTableCellProps> = ({
children,
  val,
  orderBy,
  order,
  handleSortRequest
}) => (
  <TableCell key={val} sortDirection={orderBy === val ? order : false}>
    <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
      <TableSortLabel
        active={orderBy === val}
        direction={order}
        onClick={handleSortRequest(val)}
      >
        {children}
      </TableSortLabel>
    </Tooltip>
  </TableCell>
);

export const BgLinkTableCell: React.FC<BgLinkTableCellProps> = ({
    title,
    ariaLabel,
    href
}) => (
  <TableCell>
    <Tooltip title={title} aria-label={ariaLabel}>
      <Fab
        color="secondary"
        size="small"
        href={href}
      >
        <ChevronRight />
      </Fab>
    </Tooltip>
  </TableCell>
);
