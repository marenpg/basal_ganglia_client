import React from "react";
import { Card, Box, CardContent, Typography, Table, TableRow, TableCell, TableBody, Tooltip, Link } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";

import { TableElements } from "../../Analysis/types";

import { StyleProps } from "./InformationCard.jss";

interface BoxProps extends StyleProps {
  heading: string,
  width?: string
}

export const InformationCardUnstyled: React.FC<BoxProps> = ({ classes, heading, width, children }) => (
  <Card className={classes.box} style={{ width: width ?? "250px" }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
        {heading}
      </Typography>
      {children}
    </CardContent>
  </Card>
);


interface InformationTableProps {
  elements: TableElements;
}

export const InformationTableUnstyled: React.FC<InformationTableProps> = ({ elements }) => (
  <Table size="small" padding="none">
    <TableBody>
      {elements.map(({ title, value, tooltip, link }) => (value || value === 0) ? (
        <TableRow key={`${title}-${value}`}>
          <TableCell component="th" scope="row">
            <Box fontWeight="500" pr={1} component="p" mt={0.5} mb={0.5}>
              {title}
            </Box>
          </TableCell>
          <TableCell>
            <Box display="flex">
              {link ? (
                <Link href={link}><Box component="p" mt={0} mb={0} pr={2}>{value}</Box></Link>
              ) : (
                  <Box component="p" mt={0} mb={0} pr={2}>{value}</Box>
                )
              }
              {tooltip &&
                <Tooltip title={tooltip} placement="right" enterDelay={300}>
                  <InfoIcon />
                </Tooltip>
              }
            </Box>
          </TableCell>
        </TableRow>
      ) : null)}
    </TableBody>
  </Table>
);


