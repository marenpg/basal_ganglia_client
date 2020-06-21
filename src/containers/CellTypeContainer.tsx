import React from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

import useCellTypeDetailsHooks from "../hooks/useCellTypeDetailsHooks";
import { CellTypeContext } from "../providers/contexts";
import { CellTypeContextValue } from "../providers/types";
import { CellTypeData } from "../hooks/types";
import { style, StyleProps } from "../components/Analyses/Analyses.jss";

interface CellTypeContainerProps extends StyleProps {
  cellTypeId: string;
}

const CellTypeContainer: React.FC<CellTypeContainerProps> = ({ cellTypeId, children }) => {
  const { loading, data, error } = useCellTypeDetailsHooks<CellTypeData>(cellTypeId);

  const getContextData = (data: CellTypeData): CellTypeContextValue => ({
    selectedCellType: data.CellType[0]
  })

  return (
    <>
      {loading && !error &&
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
          <CircularProgress />
        </Box>
      }
      {error && !loading && (
        <Box display="flex" alignItems="center" justifyContent="center" height="90vh">
          <Typography component="p" color="error">An error occurred while fetching the cells</Typography>
        </Box>
      )}

      {!loading && !error && data?.CellType && (
        <CellTypeContext.Provider value={getContextData(data)}>
          {children}
        </CellTypeContext.Provider>
      )}
    </>
  );
};

export default style(CellTypeContainer);

