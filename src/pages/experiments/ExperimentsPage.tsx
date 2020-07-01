import React, { useState, useContext, useEffect } from "react";

import { Box, Typography, IconButton, Container } from "@material-ui/core";
import { Cancel as CancelIcon } from "@material-ui/icons";

import { Header } from "../../components/Base/Headers";
import { AnalysesTable } from "../../components/Analyses/AnalysesTable";

import { StyleProps } from "./ExperimentsPage.jss";
import { CheckBoxElement } from "../../utils/types";
import { AnalysesContext } from "../../providers/contexts";
import { Analysis } from "../../utils/api/types";
import RadioButtons from "../../components/Base/RadioButtons";
import { getAnalysisOnSpecie, getAnalysisOnRegions, getAnalysisOnCellType } from "./utils";

const ExperimentsPage: React.FC<StyleProps> = ({ classes }) => {
  const [specieCheckboxes, setSpecieChecboxes] = useState<CheckBoxElement[]>([]);
  const [selectedSpecieId, setSelectedSpecieId] = useState<string>("1");
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);
  const [ignoreSelectedRegionCell, setIgnoreSelectedRegionCell] = useState<boolean>(false);

  const { analyses, species, selectedBrainRegions, selectedCellType, filters } = useContext(AnalysesContext);

  useEffect(() => {
    analyses && setFilteredAnalyses(getAnalysisOnSpecie(selectedSpecieId, analyses));

    if (ignoreSelectedRegionCell) return;
    const filteredCell = analyses && selectedCellType && getAnalysisOnCellType(selectedCellType.id, analyses);
    analyses && selectedBrainRegions && setFilteredAnalyses(getAnalysisOnRegions(selectedBrainRegions.map(r => r.id), filteredCell ?? []));
  }, [analyses, selectedSpecieId, selectedCellType, selectedBrainRegions])

  useEffect(() => {
    species && setSpecieChecboxes(species.map(specie => ({ ...specie, selected: true })));
  }, [species]);

  useEffect(() => {
    filters?.specie && species && setSelectedSpecieId(species.find(s => s.id === filters.specie)?.id ?? "1");
  }, [filters, species]);

  const clearBrainRegionCellTypeFilter = () => {
    setIgnoreSelectedRegionCell(true);
    setFilteredAnalyses(getAnalysisOnSpecie(selectedSpecieId, analyses));
  }

  const handleSpecieCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSpecieId(event.target.value);
    setFilteredAnalyses(getAnalysisOnSpecie(event.target.value, analyses));
  };

  return (
    <>
      <Header
        headerContainerClass={classes.headerContainer}
        pageHeaderClass={classes.pageHeader}
        subtitle=" "
        title={"Analyses"}>
        {ignoreSelectedRegionCell || !selectedBrainRegions || !selectedCellType ? (

          <Box display="flex" justifyContent="center" flexDirection="column">
            <RadioButtons
              legend="Species:"
              value={selectedSpecieId}
              elements={specieCheckboxes}
              handleChange={handleSpecieCheckboxChange}
            />
          </Box>
        ) : (
            <Box display="flex" justifyContent="center">
              <Container maxWidth="md">
                <Typography>
                  {`Analyses of ${selectedCellType?.name.toLowerCase()} cells in the ${selectedBrainRegions.map(r => r.name.toLowerCase()).join(", ")}`}
                  <IconButton
                    aria-label="Clear"
                    color="primary"
                    // className={classes.closeButton}
                    onClick={clearBrainRegionCellTypeFilter}
                  >
                    <CancelIcon />
                  </IconButton>
                </Typography>
              </Container>
            </Box>
          )
        }
      </Header>
      <AnalysesTable filteredSpecieAnalyses={filteredAnalyses} ignoreSelectedRegion={true} />
    </>
  );
};

export default ExperimentsPage;
