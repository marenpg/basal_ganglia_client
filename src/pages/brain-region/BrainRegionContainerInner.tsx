import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

import useBrainRegionDetailedHooks from "../../hooks/useBrainRegionDetailedHooks";
import { BrainRegionDataContext } from "../../providers/contexts";

import ErrorPage from "../../components/Base/ErrorPage";

import { getSubRegionIds, getAllSubRegions } from "./utils";
import { BrainRegionRouteInnerProps, BrainRegionData } from "./types";

import { BrainRegionPage } from "./BrainRegionPage";


export const BrainRegionContainerInner: React.FC<BrainRegionRouteInnerProps> = ({
    classes,
    id,
    allRegionIds
}) => {
    // After getting all ids, get all regions that are sub regions of selected region

    const regionIds = getSubRegionIds(id, allRegionIds)
    const { loading, data, error } = useBrainRegionDetailedHooks<BrainRegionData>(regionIds);

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

    if (data && data.BrainRegion) {
        const selectedRegion = data.BrainRegion.filter(r => r.id === id)[0];
        const subRegions = getAllSubRegions(selectedRegion, data.BrainRegion);
        return (
            <BrainRegionDataContext.Provider value={{ selectedRegion, subRegions, cellTypes: data.CellType, cellClasses: data.CellClass, cellGroups: data.CellGroup }}>
                <BrainRegionPage classes={classes} />
            </BrainRegionDataContext.Provider>
        );
    }
    return (
        <ErrorPage
            classes={classes}
            title="Brain region"
            subtitle=""
            message="No region found on this page."
        />
    );
};
