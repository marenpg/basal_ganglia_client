import React, { useContext, useState, useEffect } from "react";
import { AnalysisContext } from "../../providers/contexts";
import { Box } from "@material-ui/core";
import { CollapseTableRow, TableRow } from "../Base/BgTable/types";
import { BgCollapseTable } from "../Base/BgTable";
import { getAnalysisNameFormatted } from "../Analyses/utils";
import { Analysis } from "../../utils/api/types";

export const getSubRows = (analysis: Analysis): TableRow[] => {
  return (
    analysis.dataTypes.map(dataType => (
      {
        id: `${analysis.id}-${dataType.id}`,
        link: `/analyses/${analysis.id}/${dataType.id}`,
        cells: [
          { text: getAnalysisNameFormatted(dataType.name) },
        ]
      }
    ))
  )
}

const getRows = (analyses: Analysis[]): TableRow[] => (
  analyses.map(analysis => {

    return (({
      id: analysis.id,
      cells: [
        { text: getAnalysisNameFormatted(analysis.name) },
        { text: `${analysis.dataType} (${analysis.dataTypes?.length})` },
        { text: analysis.cellTypePutative?.name },
        { text: analysis.brainRegions?.map(b => b.name).join(",") },
      ],
      subHeaders: [{ text: analysis.dataType }],
      subRows: analysis.dataTypes.length ? getSubRows(analysis) : []
    }))
  })
);

export const SimilarAnalyses: React.FC = () => {
  const [rows, setRows] = useState<CollapseTableRow[]>([]);
  const { selectedAnalysis, allAnalyses } = useContext(AnalysisContext);

  useEffect(() => {
    if (!allAnalyses || !selectedAnalysis?.similarAnalyses.from.length) {
      return;
    }
    const similarAnalyses: Analysis[] = []
    selectedAnalysis.similarAnalyses.from.map(f => {
      const ana = allAnalyses?.find(a => a.id === f.Analysis.id);
      if (ana) {
        similarAnalyses.push(ana);
      }
    });
    setRows(getRows(similarAnalyses));
  }, [selectedAnalysis])

  return (
    <Box mt={2}>
      <BgCollapseTable
        orderBy=""
        order="asc"
        handleSortRequest={null}
        headers={[
          { text: "Similar analysis" },
          { text: "Data type" },
          { text: "Cell type" },
          { text: "Brain region" },
        ]}
        rows={rows}
      />
    </Box>

  );
};
