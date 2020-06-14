import React from 'react';

import { Box, Dialog, DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, DialogContentText, Link, useMediaQuery, useTheme, IconButton, Theme, Typography } from '@material-ui/core';
import { Cancel as CancelIcon } from "@material-ui/icons";
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import { BamsRegion } from '../../../utils/api/types';

import { RegionConnectivity } from './types';

const styles = (_: Theme) =>
  createStyles({
    closeButton: {
      position: "absolute",
      zIndex: 1,
      right: 4,
      top: 8,
    },
  });

interface ConnectivityDialogProps extends WithStyles<typeof styles> {
  onClose: any;
  open: boolean;
  selectedConnection: RegionConnectivity
};

interface MappingDialogProps {
  bamsRegion: BamsRegion,
  direction: string,
  matchingName: string
}

const MappingDialog: React.FC<MappingDialogProps> = ({ bamsRegion, direction, matchingName }) => (
  <Box pr={3} flex="1 1 0px">
    <Box fontSize={13.5}>
      Original {direction} region:
      <Typography component="p" variant="h6">
        {bamsRegion.name} (BAMS)
      </Typography>
    </Box>
    <DialogContentText>
      <Box fontStyle="italic" component="span">
        {bamsRegion.description}
      </Box>
    </DialogContentText>
    <DialogContentText>
      Related regions in the Waxholm Space atlas of the Sprague Dawley rat brain (WHS):
    </DialogContentText>
    <Table size="small">
      <TableBody>
        {bamsRegion.regionMappings && bamsRegion.regionMappings.map(mapping => (
          <TableRow key={mapping.BrainRegion.id}>
            <TableCell>
              <Typography variant="inherit" color={mapping.BrainRegion.name === matchingName ? "error" : "initial"}>
                {mapping.BrainRegion.name}
              </Typography>

            </TableCell>
            <TableCell>
              {mapping.relationType}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);


const ConnectivityDialogUnstyled: React.FC<ConnectivityDialogProps> = ({ classes, onClose, open, selectedConnection }) => {
  const fullScreen = useMediaQuery(useTheme().breakpoints.down('sm'));
  const bgFromName = selectedConnection.direction === "efferent" ? selectedConnection.name : selectedConnection.connectedRegion.name;
  const bgToName = selectedConnection.direction === "afferent" ? selectedConnection.name : selectedConnection.connectedRegion.name;

  return (
    <Dialog onClose={onClose} aria-labelledby="dialog-title" open={open} fullScreen={fullScreen} maxWidth="md">
      <DialogTitle id="dialog-title">
        Original Relation Information
        <IconButton
          aria-label="Close"
          color="primary"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CancelIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          This relation is collected from <Link href="https://bams2.bams1.org/search/connections/inputs/">BAMS</Link> with reference:<br />
          <Box fontStyle="italic" component="span">
            {selectedConnection.reference}
          </Box>
          <br />
          <Box fontStyle="italic" component="span">
            {selectedConnection.description}
          </Box>
        </DialogContentText>
        <Box display="flex">
          <MappingDialog bamsRegion={selectedConnection.bamsRegionFrom} direction="efferent" matchingName={bgFromName} />
          <MappingDialog bamsRegion={selectedConnection.bamsRegionTo} direction="afferent" matchingName={bgToName} />
        </Box>
      </DialogContent>
    </Dialog>
  );
}

const style = withStyles(styles);
export const ConnectivityDialog = style(ConnectivityDialogUnstyled);
