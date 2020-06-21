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
  regionIds?: string[];
}

const AnalysesContainer: React.FC<AnalysesContainerProps> = ({ analysisIds, regionIds, filters, children }) => {
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
      ageCategories: data.AgeCategory,
    })

    if (filters) {

      const splitted = filters.split("&");
      const filterMap: any = {};
      splitted.map(s => {
        const split2 = s.split("=");
        const filter = split2[0]
        const filterValue = split2[1]

        if (filter === "specie" || filter === "brainRegion" || filter === "cellType") {
          filterMap[filter] = filterValue;
        }
        if (filter === "rrids" || filter === "strains") {
          filterMap[filter] = filterValue.replace("[", "").replace("]", "").split(",");
        }
      })

      value.filters = filterMap;

      if (value.filters?.brainRegion) {
        const ids = value.filters.brainRegion.split(",");
        const regions = data.BrainRegion.filter(r => ids.includes(r.id));
        value.selectedBrainRegions = regions.length ? regions : undefined;
      }
      if (value.filters?.cellType) {
        value.selectedCellType = data.CellType.find(r => r.id === value.filters?.cellType)
      }
    }

    if (regionIds) {
      value.selectedBrainRegions = data.BrainRegion.filter(r => regionIds.includes(r.id));
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

