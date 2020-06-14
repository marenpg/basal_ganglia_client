import React, { useState, useEffect, useContext } from "react";

import { BrainRegion } from "../../utils/api/types";

import { BrainRegionDataContext } from "../../providers/contexts";
import { StyleProps } from "./BrainRegionRoute.jss";
import { Header } from "../../components/Base/Headers";
import { SubRegionToggle } from "../../components/BrainRegionComponent/SubRegionToggle";
import { BrainRegionTabs } from "../../components/BrainRegionComponent";

export interface BrainRegionPageProps extends StyleProps {
  drawer: boolean;
}

export const BrainRegionPage: React.FC<StyleProps> = ({ classes }) => {
  const [visibleSubRegions, setVisibleSubRegions] = useState<BrainRegion[]>([]);
  const [subRegionsSelected, setSubRegionsSelected] = useState(true);
  const [hasSubRegions, setHasSubRegions] = useState<boolean>();

  const { selectedRegion, subRegions } = useContext(BrainRegionDataContext);

  useEffect(() => {
    subRegions && setVisibleSubRegions(subRegions);
    setHasSubRegions(subRegions && subRegions.length > 1);
  }, [selectedRegion, subRegions]);

  const handleSubRegionsSelectedChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSubRegionsSelected = event.target.checked;
    setSubRegionsSelected(newSubRegionsSelected);
    subRegions && setVisibleSubRegions(newSubRegionsSelected ? subRegions : []);
  };

  return (
    <>
      <Header
        headerContainerClass={classes.drawerHeaderContainer}
        pageHeaderClass={classes.drawerPageHeader}
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
        selectedRegion={selectedRegion!}
        subRegions={visibleSubRegions}
      />
    </>
  );
};

