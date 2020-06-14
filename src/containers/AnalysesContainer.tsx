import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

import useAnalysesHooks from "../hooks/useAnalysesHooks";
import { AnalysesContext } from "../providers/contexts";
import { AnalysesContextValue } from "../providers/types";
import { AnalysesData } from "../hooks/types";
import { style, StyleProps } from "../components/Analyses/Analyses.jss";

interface AnalysesContainerProps extends StyleProps {
  analysisIds?: string[];
  filters?: string;
}

const AnalysesContainer: React.FC<AnalysesContainerProps> = ({ classes, analysisIds, filters, children }) => {
  const analysisIdObjects = analysisIds ? analysisIds.map(id => ({ id })) : [];
  const { loading, data, error } = useAnalysesHooks<AnalysesData>(analysisIdObjects);

  const getContextData = (data: AnalysesData): AnalysesContextValue => {
    const value: AnalysesContextValue = ({
      analyses: data.Analysis!,
      species: data.Specie,
      solutions: data.Solution,
      sex: data.Sex,
      visualizationMethods: data.VisualizationProtocol,
      reporters: data.Reporter,
      strains: data.Strain,
      ageCategories: data.AgeCategory
    })

    if (filters) {
      const splitted = filters.split("&");
      const filterMap: any = {};
      splitted.map(s => {
        const filter = s.split("=");
        if (filter[0] === "specie") {
          filterMap.specie = filter[1];
        }
        if (filter[0] === "rrids" || filter[0] === "strains") {
          filterMap[filter[0]] = filter[1].replace("[", "").replace("]", "").split(",");
        }
      })
      console.log("filterMap", filterMap);
      value.filters = filterMap;
    }
    return value;
  }

  return (
    <>
      {loading && !error &&
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <CircularProgress />
        </Box>
      }
      {error && !loading && (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Typography component="p" color="error">An error occurred while fetching the experiments</Typography>
        </Box>
      )}

      {!loading && !error && data?.Analysis && (
        <AnalysesContext.Provider value={getContextData(data)}>
          {children}
        </AnalysesContext.Provider>
      )}
    </>
  );
};

export default style(AnalysesContainer);

