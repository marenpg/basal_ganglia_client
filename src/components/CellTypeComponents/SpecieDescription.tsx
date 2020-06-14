import React, { useContext } from "react";
import { Box, Container, Typography } from "@material-ui/core";

import { CellTypeContext } from "../../providers/contexts";

export const SpecieDescription: React.FC = () => {

  const { selectedCellType } = useContext(CellTypeContext);

  const getSpecieNames = () => {
    if (!selectedCellType) return

    return selectedCellType.observedInSpecies.map(s => s.name).join(", ");
  };

  if (!selectedCellType) return <></>;

  return <Box pb={2} pt={2}>

    {selectedCellType.observedInSpecies && selectedCellType.observedInSpecies.length > 0 && (
      <>
        <Container maxWidth="sm">
          <Box pl={2} pb={2}>
            <Typography component="p">
              {`Observed in ${selectedCellType.observedInSpecies.length === 1 ? "specie" : "species"}: `}
              <Box component="span" fontStyle="italic">
                {getSpecieNames()}
              </Box>
            </Typography>
          </Box>
        </Container>
      </>
    )}
  </Box>
}