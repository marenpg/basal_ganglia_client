import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";

import { BrainRegion } from "../../utils/api/types";
import { CellTypeContext } from "../../providers/contexts";
import { InformationCard } from "../Base/InformationCard";
import { BgLinkTable } from "../Base/BgTable";
import { sortElements } from "../../utils";

export const CellTypeInformation: React.FC = () => {
  const [regions, setRegions] = useState<BrainRegion[]>([]);
  const { selectedCellType } = useContext(CellTypeContext);

  useEffect(() => {
    if (!selectedCellType?.observedInRegions?.length) return;
    const sortedRegions = sortElements<BrainRegion[]>(selectedCellType.observedInRegions, "asc", "name");
    if (selectedCellType.observedInSpecies?.length === 1) {
      setRegions(sortedRegions);
      return;
    }

    const mouseRegions = sortedRegions.filter(r => r.specie?.id === "2");
    const ratRegions = sortedRegions.filter(r => r.specie?.id === "1");
    setRegions(mouseRegions.concat(ratRegions));
  }, [selectedCellType])


  if (!selectedCellType) return <></>;

  return <Box pb={2} pt={2}>
    {selectedCellType.observedInRegions && selectedCellType.observedInRegions.length > 0 ? (
      <>
        <Box pl={2} pb={2} display="flex" justifyContent="center">
          <Typography component="p">
            {"This cell or its subcellular components have been observed in the following regions:"}
          </Typography>
        </Box>
        <InformationCard heading="" width="100%">
          <Box mt={2}>
            <BgLinkTable
              orderBy=""
              order="asc"
              handleSortRequest={null}
              headers={[{ text: "", val: "" }]}
              rows={regions.map((region => ({
                id: region.id,
                link: `/analyses/specie=${region.specie?.id}&brainRegion=${region.id}&cellType=${selectedCellType.id}`,
                cells: [{ text: `${region.specie?.id === "1" ? "Rat" : "Mouse"} ${region.name.toLowerCase()}` }]
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