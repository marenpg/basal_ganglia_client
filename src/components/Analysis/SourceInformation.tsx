import React, { useContext, useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { InformationCard, InformationTable } from "../Base/InformationCard";
import { TableElements } from "./types";

const getName = (sourceName: string) => {
  if (!sourceName) return "";
  if (sourceName.indexOf("_") < 0) return sourceName;
  return sourceName.replace("_", ", ");
};

export const SourceInformation: React.FC = () => {
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);
  const [heading, setHeading] = useState<string>();
  const { selectedAnalysis } = useContext(AnalysisContext);

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
    setHeading(getName(source.sourceName))

  }, [selectedAnalysis]);


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
    </Box>
  );
};
