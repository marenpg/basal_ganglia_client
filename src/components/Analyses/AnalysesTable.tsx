import React, { useState, useEffect, useContext } from "react";
import { Box, Container } from "@material-ui/core";

import { AnalysesContext } from "../../providers/contexts";
import { Analysis } from "../../utils/api/types";

import { TableRow } from "../Base/BgTable/types";
import { BgCollapseTable } from "../Base/BgTable";

import { sortAnalyses, getRows, headers } from "./utils";
import { TableSort } from "./types";
import { AdvancedFilter } from "./AdvancedFilter";

interface AnalysesTableProps {
  filteredSpecieAnalyses?: Analysis[];
}

export const AnalysesTable: React.FC<AnalysesTableProps> = ({ filteredSpecieAnalyses }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<TableSort>("name");
  const [rows, setRows] = useState<TableRow[]>([]);

  const [analysesOnSpecie, setAnalysesOnSpecie] = useState<Analysis[]>([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [selectedSpecieIds, setSelectedSpecieIds] = useState<string[]>([]);
  const { analyses } = useContext(AnalysesContext);

  const { species } = useContext(AnalysesContext);

  useEffect(() => {
    if (!analyses) return;

    const analysesToSort = filteredSpecieAnalyses ?? analyses;
    setSelectedSpecieIds(filteredSpecieAnalyses && filteredSpecieAnalyses[0] ? [filteredSpecieAnalyses[0].specimen.specie!.id] : species!.map(s => s.id));

    const sortedAnalyses = sortAnalyses(
      analysesToSort,
      order,
      orderBy
    );
    setAnalysesOnSpecie(sortedAnalyses);
    setFilteredAnalyses(sortedAnalyses);
  }, [analyses, filteredSpecieAnalyses]);


  useEffect(() => {
    setRows(getRows(filteredAnalyses));
  }, [filteredAnalyses])

  const handleFilteredAnalysesChange = (filteredAnalyses: Analysis[]) => {
    setFilteredAnalyses(filteredAnalyses);
  }

  const handleClearFilter = () => {
    setFilteredAnalyses(analysesOnSpecie);
  }

  const handleSortRequest = (newOrderBy: TableSort) => () => {
    const newOrder = orderBy === newOrderBy && order === "asc" ? "desc" : "asc";

    setOrder(newOrder);
    setOrderBy(newOrderBy);

    const sortedAnalysis = sortAnalyses(filteredAnalyses, newOrder, newOrderBy);
    setFilteredAnalyses(sortedAnalysis);
    setRows(getRows(sortedAnalysis))
  };

  return (
    <Box mt={4}>
      <Container maxWidth="lg">

        <AdvancedFilter
          analyses={analysesOnSpecie}
          selectedSpecieIds={selectedSpecieIds}
          handleFilteredAnalysesChange={handleFilteredAnalysesChange}
          handleClearFilter={handleClearFilter}
        />
        {rows &&
          <Box mt={2}>
            <BgCollapseTable
              orderBy={orderBy}
              order={order}
              handleSortRequest={handleSortRequest}
              headers={headers}
              rows={rows}
            />
          </Box>
        }
      </Container>
    </Box>
  );
};
