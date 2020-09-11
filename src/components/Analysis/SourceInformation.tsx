import React, { useContext, useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { InformationCard, InformationTable } from "../Base/InformationCard";
import { TableElements } from "./types";
import { getSourceName } from "./utils";
import { CellMorphology } from "../../utils/api/types";

export const SourceInformation: React.FC = () => {
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);
  const [neuroMorphoElements, setNeuroMorphoElements] = useState<TableElements>([]);
  const [heading, setHeading] = useState<string>();
  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis?.experiment?.source) return;

    const source = selectedAnalysis.experiment.source;
    setGenInfoElements([
      { title: "Id:", value: source.id },
      { title: "Title:", value: source.title },
      { title: "Publication year:", value: source.publicationYear },
      { title: "Raw data available:", value: source.rawDataAvailable },
      { title: "Journal:", value: source.collectedFrom.name },
    ]);
    setHeading(getSourceName(source.sourceName))

  }, [selectedAnalysis]);

  useEffect(() => {
    if (!selectedData || selectedAnalysis?.dataType !== "Morphology") {
      return;
    }

    const morpho = selectedData as CellMorphology;
    if (!morpho.morphology) {
      return;
    }

    setNeuroMorphoElements([
      { title: "Description:", value: "Citation for the morphology presented in the \"Morphology\" tab. The reconstructed morphology is collected from NeuroMorpho.org." },
      { title: "Original paper DOIs:", value: morpho.morphology.dois.includes(selectedAnalysis.experiment?.source?.id) ? "" : morpho.morphology.dois },
      { title: "Archive:", value: morpho.morphology.archive },
      { title: "NeuroMorpho:", value: "Ascoli GA, Donohue DE, Halavi M. (2007) NeuroMorpho.Org: a central resource for neuronal morphologies.J Neurosci., 27(35):9247-51" },

    ]);

  }, [selectedData, selectedAnalysis]);


  if (!selectedAnalysis) return <></>;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly" mt={4}>
      {genInfoElements.length > 0 &&
        <InformationCard heading={heading ?? ""} width="100%">
          <Box mt={2}>
            <InformationTable elements={genInfoElements} />
          </Box>
        </InformationCard>
      }
      {neuroMorphoElements.length > 0 ? (
        <InformationCard heading={"NeuroMorpho.Org"} width="100%">
          <Box mt={2}>
            <InformationTable elements={neuroMorphoElements} />
          </Box>
        </InformationCard>
      ) : null}
    </Box>
  );
};
