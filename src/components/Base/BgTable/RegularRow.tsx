import React from "react";
import { Link, TableCell, TableRow } from "@material-ui/core";
import { RegularRowProps } from "./types";

export const RegularRow: React.FC<RegularRowProps> = ({ classes, row, headers, onClick }) => (<TableRow hover key={row.link} title={row.title} className={classes.tableRow}>
  {row.cells.map((cell, i) => (
    <TableCell key={`${headers[i].text}-${cell.text}`} className={classes.tableCell}>
      {onClick ? (
        <Link
          component="button"
          color="textPrimary"
          variant="body1"
          onClick={onClick(row.id)}
          className={classes.tableLink}>
          {cell.text ? cell.text : "-"}
        </Link>
      ) : (
          <Link
            href={row.link}
            color="textPrimary"
            variant="body1"
            target="_blank"
            className={classes.tableLink}
          >
            {cell.text ? cell.text : "-"}
          </Link>
        )}

    </TableCell>))}
</TableRow>);
