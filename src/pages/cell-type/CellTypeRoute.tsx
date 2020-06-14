import React from "react";

import { Box, IconButton, Link } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";

import CellTypeContainer from "../../containers/CellTypeContainer";
import CellTypePage from "./CellTypePage";

import { CellTypeRouteProps } from "./types";

const CellTypeRoute: React.FC<CellTypeRouteProps> = ({ classes, match }) => {
    const { id } = match.params;

    return <Box pt={7}>
        <IconButton
            aria-label="Back to all cell types"
            title="See all cell types"
            color="primary"
            className={classes.closeButton}
            component={Link}
            href={"/cell-types"}
        >
            <CancelIcon />
        </IconButton>
        <CellTypeContainer cellTypeId={id}>
            <CellTypePage />
        </CellTypeContainer>
    </Box>
};

export default CellTypeRoute;