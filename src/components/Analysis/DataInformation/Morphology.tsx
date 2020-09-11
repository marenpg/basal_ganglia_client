import React, { useContext, useState, useEffect } from "react";

import { Box, Typography, Link } from "@material-ui/core";
import { AnalysisContext } from "../../../providers/contexts";

import { InformationCard, InformationTable } from "../../Base/InformationCard";
import { TableElements } from "../types";
import { CellMorphology, Neuromorpho } from "../../../utils/api/types";
import { getTableElementsCellMorphology } from "./utils";


export const MorphologyInformation: React.FC = () => {
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);
  const [neuromorphoLinks, setNeuromorphoLinks] = useState<Neuromorpho>();
  const [softwareElements, setSoftwareElements] = useState<TableElements>([]);

  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis || !selectedData) return;
    const data = selectedData as CellMorphology;
    if (!data) return;

    selectedAnalysis && setGenInfoElements(getTableElementsCellMorphology(data))
    const setNeuromorphoData = async () => {
      setNeuromorphoLinks(data.morphology);
    }
    setNeuromorphoData();

    data.reconstructionMethod && setSoftwareElements([
      { title: "Name", value: data.reconstructionMethod.name },
      { title: "RRID", value: data.reconstructionMethod.rrid },
    ]);

  }, [selectedAnalysis, selectedData]);

  if (!selectedAnalysis) return <></>;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start" mt={4}>
      {neuromorphoLinks ? (
        <InformationCard heading="Morphology" width="100%">
          <img src={`data:image/png;base64, ${neuromorphoLinks.base64.replace("b'", "").replace("'", "")}`} alt="" style={{ maxWidth: "300px" }} />
          <Typography variant="body2" color="textSecondary" component="p">
            {"This morphology is collected from "}
            <Link href={neuromorphoLinks.href}>NeuroMorpho.Org</Link>
            {` (${neuromorphoLinks?.archive} repository). `}
            {"See "} <Link href="#4">Sources</Link> {"for detailed information."}
          </Typography>
        </InformationCard>
      ) : null}
      {genInfoElements.length > 0 ? (
        <InformationCard heading="Information" width="100%">
          <Box mt={2}>
            <InformationTable elements={genInfoElements} />
          </Box>
        </InformationCard>
      ) : null
      }

      {softwareElements.length > 0 ? (
        <InformationCard heading="Reconstruction method" width={"70%"}>
          <Box mt={2}>
            <InformationTable elements={softwareElements} />
          </Box>
        </InformationCard>
      ) : null
      }
    </Box>
  );
};
