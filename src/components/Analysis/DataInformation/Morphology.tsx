import React, { useContext, useState, useEffect } from "react";

import { Box, Typography, Link } from "@material-ui/core";
import { AnalysisContext } from "../../../providers/contexts";

import { InformationCard, InformationTable } from "../../Base/InformationCard";
import { TableElements } from "../types";
import { CellMorphology } from "../../../utils/api/types";
import { getTableElementsOnDataType } from "./utils";


export const MorphologyInformation: React.FC = () => {
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);
  const [neuromorphoLinks, setNeuromorphoLinks] = useState<{ href?: string, imgSrc?: string, archive?: string }>();
  const [softwareElements, setSoftwareElements] = useState<TableElements>([]);

  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis || !selectedData) return;
    selectedAnalysis && setGenInfoElements(getTableElementsOnDataType(selectedAnalysis, selectedData))
    const data = selectedData as CellMorphology;
    if (!data) return;

    const setNeuromorphoData = async () => {
      const links = await getNeuromorphoData(data);
      setNeuromorphoLinks(links);
    }
    setNeuromorphoData();

    data.reconstructionMethod && setSoftwareElements([
      { title: "Name", value: data.reconstructionMethod.name },
      { title: "RRID", value: data.reconstructionMethod.rrid },
    ]);

  }, [selectedAnalysis, selectedData]);

  const getNeuromorphoData = async (morphology: CellMorphology) => {
    const neuromorphoId = morphology.neuromorphoId.indexOf("NMO_0") >= 0 ? morphology.neuromorphoId.replace("NMO_0", "") : morphology.neuromorphoId.replace("NMO_", "");
    const url = "http://neuromorpho.org/api/neuron/id/" + neuromorphoId;
    const res = await fetch(url);
    const data = await res.json()

    return {
      href: "http://neuromorpho.org/neuron_info.jsp?neuron_name=" + data["neuron_name"],
      imgSrc: data["png_url"],
      archive: data["archive"]
    }
  }

  if (!selectedAnalysis) return <></>;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start" mt={4}>
      {neuromorphoLinks && (
        <InformationCard heading="Morphology" width="100%">
          <img src={neuromorphoLinks.imgSrc} alt="" style={{ maxWidth: "300px" }} />
          <Typography variant="body2" color="textSecondary" component="p">
            {"This morphology is collected from "}
            <Link href={neuromorphoLinks.href}>neuromorpho.org</Link>
            {` (${neuromorphoLinks?.archive} repository).`}
          </Typography>
        </InformationCard>
      )}
      {genInfoElements.length > 0 &&
        <InformationCard heading="Information" width="100%">
          <Box mt={2}>
            <InformationTable elements={genInfoElements} />
          </Box>
        </InformationCard>
      }

      {softwareElements.length > 0 &&
        <InformationCard heading="Reconstruction method" width={"70%"}>
          <Box mt={2}>
            <InformationTable elements={softwareElements} />
          </Box>
        </InformationCard>
      }

    </Box>
  );
};
