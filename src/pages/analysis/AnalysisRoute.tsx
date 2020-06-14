import React from "react";

import { Box } from "@material-ui/core";

import AnalysisContainer from "../../containers/AnalysisContainer";
import AnalysisPage from "./AnalysisPage";
import { AnalysisRouteProps } from "./types";

const AnalysisRoute: React.FC<AnalysisRouteProps> = ({ match }) => {
    const { id, dataId } = match.params;

    return <Box pt={7}>
        <AnalysisContainer analysisId={id} dataId={dataId}>
            <AnalysisPage />
        </AnalysisContainer>
    </Box>
};

export default AnalysisRoute;