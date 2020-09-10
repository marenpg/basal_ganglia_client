import React, { useContext, useState, useEffect } from "react";
import { AnalysisContext } from "../../providers/contexts";
import { Button, Box, Link } from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { CollapseTableRow, TableRow } from "../Base/BgTable/types";
import { BgCollapseTable } from "../Base/BgTable";
import { getAnalysisNameFormatted } from "../Analyses/utils";
import { Analysis } from "../../utils/api/types";

const getSubRows = (analysis: Analysis): TableRow[] => {
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
  const hasSimilarAnalyses = selectedAnalysis?.similarAnalyses?.from.length;

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
  }, [allAnalyses, selectedAnalysis])

  return (
    <Box mt={2}>
      {selectedAnalysis?.brainRegions.map(region => (
        <Box mb={2} key={region.id}>
          <Button component={Link} color="primary" startIcon={<NavigateNextIcon />} href={`/brain-regions/${region.id}#1`}>See all analyses performed on the brain region {region.name}</Button>
        </Box>
      ))}
      {selectedAnalysis?.cellTypePutative ? (
        <Box mb={2}>
          <Button component={Link} color="primary" startIcon={<NavigateNextIcon />} href={`/cell-types/${selectedAnalysis?.cellTypePutative.id}#0`}>See all analyses performed on the cell type {selectedAnalysis?.cellTypePutative.name}</Button>
        </Box>
      ) : null}
      {hasSimilarAnalyses ? (
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
      ) : null}
    </Box>
  );
};
