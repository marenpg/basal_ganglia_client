import React, { useContext } from "react";
import { Box, Typography } from "@material-ui/core";

import { CellTypeContext } from "../../providers/contexts";
import { InformationCard } from "../Base/InformationCard";
import { BgLinkTable } from "../Base/BgTable";

export const CellTypeInformation: React.FC = () => {

  const { selectedCellType } = useContext(CellTypeContext);

  if (!selectedCellType) return <></>;

  return <Box pb={2} pt={2}>
    {selectedCellType.observedInRegions && selectedCellType.observedInRegions.length > 0 ? (
      <>
        <Box pl={2} pb={2} display="flex" justifyContent="center">
          <Typography component="p">
            {`Observed in `}
            <Typography component="span" variant="h1">
              {selectedCellType.observedInRegions.length}
            </Typography>
            {" brain regions"}
          </Typography>
        </Box>
        <InformationCard heading="" width="100%">
          <Box mt={2}>
            <BgLinkTable
              orderBy=""
              order="asc"
              handleSortRequest={null}
              headers={[{ text: "", val: "" }]}
              rows={selectedCellType.observedInRegions.map((region => ({
                id: region.id,
                link: `/brain-regions/${region.id}`,
                cells: [{ text: region.name }]
              })))}
            />
          </Box>
        </InformationCard>
      </>
    ) : (
        <Box fontStyle="italic">
          <Typography>This cell type is not registered in any brain regions</Typography>
        </Box>
      )
    }
  </Box>
}