import React, { useContext, useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { InformationCard, InformationTable } from "../Base/InformationCard";
import { TableElement, TableElements } from "./types";
import { getStringRep, getDataTypeShortName, getAtlasPrettyName } from "./utils";

export const AnatomicalMetadata: React.FC = () => {
  const [regionElements, setRegionElements] = useState<TableElements>([]);
  const [metadataElements, setMetadataElements] = useState<TableElements>([]);
  const [collectorsComment, setCollectorsComment] = useState<TableElement>();

  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis || !selectedData) return;

    const regionRecord = selectedData.regionRecord;

    const regionZone = "regionZone" in selectedData ? selectedData.regionZone : undefined;

    // const regions = selectedAnalysis.brainRegions.map(r => r.name)?.join(", ");
    const region = regionRecord.coverage === "Part of region" && regionZone ?
      `Part of ${regionRecord.primaryRegion?.name} (${getStringRep(regionZone.name, regionZone.ontology)})`
      : regionRecord.primaryRegion?.name;

    regionRecord && setRegionElements([
      { title: "Brain region", value: region },
      { title: "Coverage", value: regionRecord.coverage === "Part of region" ? "" : regionRecord.coverage, tooltip: "How much of the region is covered by the analysis" },
      { title: "Specificity", value: regionRecord.specificity, tooltip: "Whether or not the analysis specifically related to the region. If non-specific, surrounding regions may be covered" },
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

  }, [selectedAnalysis, selectedData]);

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
