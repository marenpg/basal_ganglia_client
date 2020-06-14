import React, { useState, useContext, useEffect } from "react";

import { Box } from "@material-ui/core";

import { Header } from "../../components/Base/Headers";
import { AnalysesTable } from "../../components/Analyses/AnalysesTable";

import { StyleProps } from "./ExperimentsPage.jss";
import { CheckBoxElement } from "../../utils/types";
import { AnalysesContext } from "../../providers/contexts";
import { Analysis } from "../../utils/api/types";
import RadioButtons from "../../components/Base/RadioButtons";

const ExperimentsPage: React.FC<StyleProps> = ({ classes }) => {
  const [specieCheckboxes, setSpecieChecboxes] = useState<CheckBoxElement[]>([]);
  const [selectedSpecieId, setSelectedSpecieId] = useState<string>("1");
  const [filteredAnalyses, setFilteredAnalyses] = useState<Analysis[]>([]);

  const { analyses, species, filters } = useContext(AnalysesContext);

  useEffect(() => {
    analyses && setFilteredAnalyses(getAnalysisOnSpecie(selectedSpecieId, analyses));
  }, [analyses, selectedSpecieId])

  useEffect(() => {
    species && setSpecieChecboxes(species.map(specie => ({ ...specie, selected: true })));
  }, [species]);

  useEffect(() => {
    filters?.specie && species && setSelectedSpecieId(species.find(s => s.id === filters.specie)?.id ?? "1");
  }, [filters]);

  const getAnalysisOnSpecie = (specieId: string, analysesToFilter?: Analysis[]) => {
    return analysesToFilter ? analysesToFilter.filter(a => specieId === a.specimen.specie.id) : [];
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
        title={"Experiments"}>
        <Box display="flex" justifyContent="center" flexDirection="column">
          <RadioButtons
            legend="Species:"
            value={selectedSpecieId}
            elements={specieCheckboxes}
            handleChange={handleSpecieCheckboxChange}
          />
        </Box>
      </Header>
      <AnalysesTable filteredSpecieAnalyses={filteredAnalyses} />
    </>
  );
};

export default ExperimentsPage;
