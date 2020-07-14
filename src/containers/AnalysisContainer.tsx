import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

import useAnalysesDetailedHooks from "../hooks/useAnalysesDetailedHooks";
import { AnalysisData } from "../hooks/types";
import { AnalysisContext } from "../providers/contexts";
import { AnalysisContextValue } from "../providers/types";
import { Analysis, Quantitation, Distribution, CellMorphology } from "../utils/api/types";

import { style, StyleProps } from "../components/Analyses/Analyses.jss";

interface AnalysisContainerProps extends StyleProps {
    analysisId: string;
    dataId: string;
}

const getSelectedData = (analysis: Analysis, dataId: string): Quantitation | Distribution | CellMorphology | undefined => {
    if (analysis.quantitations.length > 0) {
        return analysis.quantitations.find(d => d.id === dataId);
    }

    if (analysis.distributions.length > 0) {
        return analysis.distributions.find(d => d.id === dataId);
    }

    return analysis.cellMorphologies.find(d => d.id === dataId);
}

const AnalysesContainer: React.FC<AnalysisContainerProps> = ({ analysisId, dataId, children }) => {
    const { loading, data, error } = useAnalysesDetailedHooks<AnalysisData>(analysisId);

    const getContextData = (data: AnalysisData): AnalysisContextValue => {
        const selectedAnalysis = data.Analysis[0];
        const selectedData = getSelectedData(selectedAnalysis, dataId);

        return ({
            selectedAnalysis,
            selectedData,
            allAnalyses: data.allAnalyses
        })
    }

    return (
        <>
            {loading && !error &&
                <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
                    <CircularProgress />
                </Box>
            }
            {error && !loading && (
                <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
                    <Typography component="p" color="error">An error occurred while fetching the experiments</Typography>
                </Box>
            )}

            {!loading && !error && data?.Analysis && (
                <AnalysisContext.Provider value={getContextData(data)}>
                    {children}
                </AnalysisContext.Provider>
            )}
        </>
    );
};

export default style(AnalysesContainer);

