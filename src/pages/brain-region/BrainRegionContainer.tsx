import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import useBrainRegionIdsHooks from "../../hooks/useBrainRegionIdsHooks";
import { BrainRegion } from "../../utils/api/types";

import { StyleProps } from "./BrainRegionRoute.jss";
import ErrorPage from "../../components/Base/ErrorPage";
import { BrainRegionContainerInner } from "./BrainRegionContainerInner";

export interface BrainRegionContainerProps extends StyleProps {
    id: string;
}

export const BrainRegionContainer: React.FC<BrainRegionContainerProps> = ({ classes, id }) => {
    const { loading, data, error } = useBrainRegionIdsHooks<{ BrainRegion: BrainRegion[] }>();

    if (loading && !error) {
        return <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
        </Box>;
    }

    if (error && !loading) {
        return <ErrorPage
            classes={classes}
            title="Brain regions"
            subtitle=""
            message="Oups, an error occurred while fetching this region" />;
    }

    if (data) {
        return <BrainRegionContainerInner
            classes={classes}
            allRegionIds={data.BrainRegion}
            id={id}
        />
    }

    return <ErrorPage
        classes={classes}
        title="Brain region"
        subtitle=""
        message="No region found on this page." />;
};