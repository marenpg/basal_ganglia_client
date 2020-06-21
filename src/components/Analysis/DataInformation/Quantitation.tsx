import React, { useContext, useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { AnalysisContext } from "../../../providers/contexts";
import { Quantitation } from "../../../utils/api/types";
import { InformationCard, InformationTable } from "../../Base/InformationCard";
import { getAnalysisNameFormatted } from "../../Analyses/utils";

import { TableElements } from "../types";
import { getStereologyElements, getQuantitationSummary, getTableElementsQuantitation, getQuantitationData } from "./utils";
import { InfoRow } from "./Common";


export const QuantitationInformation: React.FC = () => {
  const [headerData, setHeaderData] = useState<TableElements>([])
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);

  const [stereologyElements, setStereologyElements] = useState<TableElements>([]);
  const [softwareElements, setSoftwareElements] = useState<TableElements>([]);
  const [summary, setSummary] = useState<string>("");


  const { selectedAnalysis, selectedData } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis) return;
    // TODO Add related distribution when I can link it.

    if (!selectedData) return;
    const data = selectedData as Quantitation;

    const tableElements: TableElements = getTableElementsQuantitation(data, selectedAnalysis);
    if (data.relatedDistributions.length) {
      data.relatedDistributions.map(d => {
        tableElements.push({ title: "Related distribution", value: getAnalysisNameFormatted(d.name), link: `/analyses/${d.analysis.id}/${d.id}` })
      })
    }

    setGenInfoElements(tableElements)
    setHeaderData(getQuantitationData(selectedAnalysis, data));
    data.stereology && setStereologyElements(getStereologyElements(data));
    data.software && setSoftwareElements([
      { title: "Name", value: data.software.name },
      { title: "RRID", value: data.software.rrid },
    ]);

    setSummary(getQuantitationSummary(data, selectedAnalysis));
  }, [selectedAnalysis, selectedData]);

  if (!selectedAnalysis) return <></>;

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
      <Box component="p" mt={4} mb={2} textAlign="center" width="100%">
        <Box component="span">
          {summary}
        </Box>
        <Box component="span" display="block">
          {"Browse detailed methodological information in the tabs above."}
        </Box>
      </Box>
      <Box mt={2} mb={2} ml={1} textAlign="left" width="100%">
        {headerData.map(data => (
          <InfoRow key={data.title} title={data.title} value={data.value} />
        ))
        }
      </Box>
      {genInfoElements.length > 0 &&
        <InformationCard heading="Information" width="100%">
          <Box mt={2}>
            <InformationTable elements={genInfoElements} />
          </Box>
        </InformationCard>
      }

      {stereologyElements.length > 0 &&
        <InformationCard heading="Stereology details" width={"40%"}>
          <Box mt={2}>
            <InformationTable elements={stereologyElements} />
          </Box>
        </InformationCard>
      }
      {softwareElements.length > 0 &&
        <InformationCard heading="Software" width={"40%"}>
          <Box mt={2}>
            <InformationTable elements={softwareElements} />
          </Box>
        </InformationCard>
      }

    </Box>
  );
};
