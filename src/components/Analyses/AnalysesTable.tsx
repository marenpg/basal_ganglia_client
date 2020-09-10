import React, { useState, useEffect, useContext } from "react";
import { Box, Container, Typography } from "@material-ui/core";

import { AnalysesContext } from "../../providers/contexts";
import { Analysis } from "../../utils/api/types";

import { getAnalysisOnRegions } from "../../pages/experiments/utils";
import { TableRow } from "../Base/BgTable/types";
import { BgCollapseTable } from "../Base/BgTable";
import SearchField from "../Base/Search";

import { sortAnalyses, getRows, headers, getSearchFilterAnalyses } from "./utils";
import { TableSort } from "./types";
import { AdvancedFilter } from "./AdvancedFilter";

interface AnalysesTableProps {
  filteredSpecieAnalyses?: Analysis[];
  ignoreSelectedRegion?: boolean;
}

export const AnalysesTable: React.FC<AnalysesTableProps> = ({ filteredSpecieAnalyses, ignoreSelectedRegion }) => {
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<TableSort>("name");
  const [rows, setRows] = useState<TableRow[]>([]);

  const [analysesOnSpecie, setAnalysesOnSpecie] = useState<Analysis[]>([]);
  const [advancedFilteredAnalyses, setAdvancedFilteredAnalyses] = useState<Analysis[]>([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);

  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedSpecieIds, setSelectedSpecieIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { analyses, species, selectedBrainRegions } = useContext(AnalysesContext);

  useEffect(() => {
    if (!analyses) return;
    setSelectedSpecieIds(filteredSpecieAnalyses && filteredSpecieAnalyses[0] ? [filteredSpecieAnalyses[0].specimen.specie!.id] : species!.map(s => s.id));

    let analysesToSort = filteredSpecieAnalyses ?? analyses;

    if (!ignoreSelectedRegion && selectedBrainRegions) {
      analysesToSort = getAnalysisOnRegions(selectedBrainRegions.map(r => r.id), analysesToSort);
    }

    const sortedAnalyses = sortAnalyses(
      analysesToSort,
      order,
      orderBy
    );

    setAnalysesOnSpecie(sortedAnalyses);
    setAdvancedFilteredAnalyses(sortedAnalyses);
    setLoading(false);
  }, [analyses, filteredSpecieAnalyses, order, orderBy, species, selectedBrainRegions, ignoreSelectedRegion]);

  useEffect(() => {
    setFilteredAnalyses(getSearchFilterAnalyses(searchFilter, advancedFilteredAnalyses));
  }, [searchFilter, advancedFilteredAnalyses])


  useEffect(() => {
    setRows(getRows(filteredAnalyses));
  }, [filteredAnalyses])

  const handleFilteredAnalysesChange = (newAdvancedFilteredAnalyses: Analysis[]) => {
    setAdvancedFilteredAnalyses(newAdvancedFilteredAnalyses);
  }

  const handleClearFilter = () => {
    setAdvancedFilteredAnalyses(analysesOnSpecie);
  }

  const handleSortRequest = (newOrderBy: TableSort) => () => {
    const newOrder = orderBy === newOrderBy && order === "asc" ? "desc" : "asc";

    setOrder(newOrder);
    setOrderBy(newOrderBy);

    const sortedAnalysis = sortAnalyses(filteredAnalyses, newOrder, newOrderBy);
    setFilteredAnalyses(sortedAnalysis);
    setRows(getRows(sortedAnalysis))
  };

  const handleSearchFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    setSearchFilter(searchValue);
  };

  if (!loading && !analysesOnSpecie.length) {
    return <Box mt={4}>
      <Container maxWidth="lg">
        <Typography align="center">No analyses found for this region.</Typography>
      </Container>
    </Box>
  }

  return (
    <Box mt={4}>
      <Container maxWidth="sm">
        <SearchField
          id="brain-region-search"
          label="Search for analyses by author name or year"
          searchValue={searchFilter}
          handleSearch={handleSearchFilterChange}
        />
      </Container>
      <Container maxWidth="lg">
        <AdvancedFilter
          analyses={analysesOnSpecie}
          selectedSpecieIds={selectedSpecieIds}
          handleFilteredAnalysesChange={handleFilteredAnalysesChange}
          handleClearFilter={handleClearFilter}
        />

        <Box mt={2} mb={4}>
          {rows && rows.length ? (
            <BgCollapseTable
              orderBy={orderBy}
              order={order}
              handleSortRequest={handleSortRequest}
              headers={headers}
              rows={rows}
            />
          ) : (
              <Typography align="center">No analyses matches the filter</Typography>
            )}
        </Box>
      </Container>
    </Box>
  );
};
