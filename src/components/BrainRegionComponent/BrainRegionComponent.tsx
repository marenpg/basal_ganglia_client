import React, { useState, useEffect, useContext } from "react";

import { Header } from "../Base/Headers";
import { BrainRegion } from "../../utils/api/types";
import { BrainRegionProps } from "./types";
import { SubRegionToggle } from "./SubRegionToggle";
import { BrainRegionTabs } from "./BrainRegionTabs";
import { getAllSubRegions } from "./utils";
import { BrainRegionsDataContext } from "../../providers/contexts";

export const BrainRegionComponent: React.FC<BrainRegionProps> = ({ classes, id, regions, drawer = false }) => {
  const [allSubRegions, setAllSubRegions] = useState<BrainRegion[]>([]);
  const [subRegions, setSubRegions] = useState<BrainRegion[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<BrainRegion>(regions.filter(r => r.id === id)[0]);
  const [subRegionsSelected, setSubRegionsSelected] = useState(true);
  const [hasSubRegions, setHasSubRegions] = useState<boolean>();

  const { BrainRegion: brainRegions, Specie: species } = useContext(BrainRegionsDataContext);

  useEffect(() => {

    const selectedRegion = regions.filter(r => r.id === id)[0];
    const updatedSubRegions = getAllSubRegions(selectedRegion, regions);
    setSubRegions(updatedSubRegions);
    setAllSubRegions(updatedSubRegions);
    setSelectedRegion(selectedRegion);
    setHasSubRegions(regions.length > 1);
  }, [regions]);

  const handleSubRegionsSelectedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSubRegionsSelected = event.target.checked;
    setSubRegionsSelected(newSubRegionsSelected);
    setSubRegions(newSubRegionsSelected ? allSubRegions : []);
  };

  return (
    <>
      <Header
        headerContainerClass={drawer ? classes.drawerHeaderContainer : classes.headerContainer}
        pageHeaderClass={drawer ? classes.drawerPageHeader : classes.pageHeader}
        subtitle={selectedRegion!.specie ? selectedRegion!.specie.name : ""}
        title={selectedRegion!.name}
      >
        {hasSubRegions && (
          <SubRegionToggle
            subRegionsSelected={subRegionsSelected}
            handleChange={handleSubRegionsSelectedChange} />
        )}
      </Header>
      <BrainRegionTabs
        classes={classes}
        selectedRegion={selectedRegion}
        subRegions={subRegions}
      />
    </>
  );
};

