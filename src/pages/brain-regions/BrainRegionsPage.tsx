import React, { useState, useEffect, useContext } from "react";

import { Box, Container } from "@material-ui/core";

import { SpecieCheckbox, GenericTreeNode } from "../../utils/types";
import { BrainRegionsDataContext } from "../../providers/contexts";

import SearchField from "../../components/Base/Search";
import { Header } from "../../components/Base/Headers";
import { Checkboxes } from "../../components/Base/Checkboxes/Checkboxes";

import { SpecieBrainRegions } from "../../components/BrainRegions";
import { SpecieRegions } from "../../components/BrainRegions/types";
import { generateSpecieBrainRegions } from "../../components/BrainRegions/utils";


import { StyleProps } from "./BrainRegionsContainer.jss";
import RegionDrawer from "./RegionDrawer";

const BrainRegionsPage: React.FC<StyleProps> = ({ classes }) => {
  const [speciesRegions, setSpeciesRegions] = useState<SpecieRegions[]>([]);
  const [specieCheckboxes, setSpecieChecboxes] = useState<SpecieCheckbox[]>([])
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [selectedRegionId, setSelectedRegionId] = useState<string>();

  const { BrainRegion: brainRegions, Specie: species } = useContext(BrainRegionsDataContext);

  useEffect(() => {
    species && setSpecieChecboxes(species.map(specie => ({ ...specie, selected: true })));
  }, [brainRegions, species]);

  useEffect(() => {
    brainRegions && species && setSpeciesRegions(generateSpecieBrainRegions(brainRegions, species));
  }, [brainRegions]);


  const handleSearchFilterChange = () => (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchValue = event.target.value;
    setSearchFilter(searchValue);
  };

  const handleSpecieChange = (specie_id: string) => (): void => {
    setSpecieChecboxes(specieCheckboxes.map(s => {
      if (s.id === specie_id) return { ...s, selected: !s.selected };
      return s;
    }));

    setSpeciesRegions(speciesRegions.map(s => {
      if (s.specieId === specie_id) return { ...s, selected: !s.selected };
      return s;
    }));
  };

  const handleRegionSelected = (region: GenericTreeNode): void => {
    setSelectedRegionId(region.id);
  };

  return (
    <>
      <Header
        headerContainerClass={classes.headerContainer}
        pageHeaderClass={classes.pageHeader}
        subtitle={"Search for brain region"}
        title={"Brain regions"} />

      <Container maxWidth="sm">
        <SearchField
          id="brain-region-search"
          label="Search for brain region"
          searchValue={searchFilter}
          handleSearch={handleSearchFilterChange()}
        />
        <Box display="flex" justifyContent="start">
          <Checkboxes
            legend="Species:"
            elements={specieCheckboxes}
            handleChange={handleSpecieChange}
          />
        </Box>
        <Box
          mt={3}
          mb={2}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          className={classes.specieTreeContainer}
        >
          {speciesRegions && speciesRegions.map(specieRegions => (specieRegions.selected && <SpecieBrainRegions
            key={specieRegions.specieId}
            title={`${specieRegions.specieName}`}
            filter={searchFilter}
            regions={specieRegions.regions}
            handleRegionSelected={handleRegionSelected}
          />))

          }
        </Box>
      </Container>
      <RegionDrawer selectedRegionId={selectedRegionId} />
    </>
  );
};

export default BrainRegionsPage;
