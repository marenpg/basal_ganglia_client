import React, { useContext, useState, useEffect } from "react";

import { Box, Typography } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { InformationCard, InformationTable } from "../Base/InformationCard";
import { TableElement, TableElements } from "./types";
import { getStringRep, getDataTypeShortName, getAtlasPrettyName } from "./utils";

export const AnatomicalMetadata: React.FC = () => {
  const [ooiElements, setOoiElements] = useState<TableElements>([]);
  const [regionElements, setRegionElements] = useState<TableElements>([]);
  const [metadataElements, setMetadataElements] = useState<TableElements>([]);
  const [collectorsComment, setCollectorsComment] = useState<TableElement>();

  const { selectedAnalysis } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis) return;

    selectedAnalysis.objectOfInterest && setOoiElements([
      { title: "Name:", value: getStringRep(selectedAnalysis.objectOfInterest.NeuralStructure.name, selectedAnalysis.objectOfInterest.NeuralStructure.ontology) },
      { title: "Recognition criteria:", value: selectedAnalysis.objectOfInterest.recognitionCriteria },
    ]);

    const regionRecord =
      (selectedAnalysis?.quantitations && selectedAnalysis?.quantitations[0]?.regionRecord)
      ?? (selectedAnalysis?.distributions && selectedAnalysis?.distributions[0]?.regionRecord)
      ?? (selectedAnalysis?.cellMorphologies && selectedAnalysis?.cellMorphologies[0]?.regionRecord)

    const regionZone =
      (selectedAnalysis?.quantitations && selectedAnalysis?.quantitations[0]?.regionZone)
      ?? (selectedAnalysis?.cellMorphologies && selectedAnalysis?.cellMorphologies[0]?.regionZone)

    const regions = selectedAnalysis.brainRegions.map(r => r.name)?.join(", ");
    regionRecord && setRegionElements([
      { title: "Brain region", value: regions },
      { title: "Region zone", value: regionZone && getStringRep(regionZone.name, regionZone.ontology) },
      { title: "Coverage", value: regionRecord.coverage, tooltip: "Something" },
      { title: "Specificity", value: regionRecord.specificity, tooltip: "soomtthing" },
    ])

    regionRecord && setMetadataElements([
      { title: "Parcellation scheme", value: regionRecord.parcellationScheme },
      { title: "Atlas coordinates", value: regionRecord.atlasCoordinates },
      { title: "Illustration", value: regionRecord.illustration },
      { title: "Semantic description", value: regionRecord.semanticDescription },
      { title: "Annotated images", value: regionRecord.annotatedImages },
      { title: "Regional characteristics", value: regionRecord.regionalCharacteristics },
      { title: "Is atlas region", value: regionRecord.isAtlasRegion },
      { title: "Serial sections", value: regionRecord.serialSections },
      { title: "Documentation score", value: regionRecord.documentationScore }
    ]);

    setCollectorsComment({ title: "Collectors comment", value: regionRecord.collectorsComment })

  }, [selectedAnalysis]);

  if (!selectedAnalysis) return <></>;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
      <Box component="p" mt={3} mb={2}>
        {`This ${getDataTypeShortName(selectedAnalysis)} has been semantically registered to the ${getAtlasPrettyName(selectedAnalysis)}`}
      </Box>

      <InformationCard heading="Region record" width="80%">
        {regionElements.length > 0 &&
          <Box mt={2}>
            <InformationTable elements={regionElements} />
          </Box>
        }
        {metadataElements &&
          <Box mt={2}>
            <Box component="p" mt={3} mb={1} textAlign="left">{"Information about anatomical metadata provided in the source"}</Box>
            <InformationTable elements={metadataElements} />
          </Box>
        }
        {collectorsComment &&
          <Box mt={2}>
            <InformationTable elements={[collectorsComment]} />
          </Box>
        }
      </InformationCard>

    </Box>
  );
};
