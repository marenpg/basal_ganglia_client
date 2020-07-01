import React, { useState, useEffect } from "react";

import CloseableDrawer from "../../components/Base/CloseableDrawer";
import { BrainRegionContainer } from "../brain-region";

interface RegionDrawerProps {
  selectedRegionId: string | undefined;
}

const RegionDrawer: React.FC<RegionDrawerProps> = ({ selectedRegionId }) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    setDrawerOpen(!!selectedRegionId)
  }, [selectedRegionId]);

  if (!selectedRegionId) return <></>;

  return (
    <CloseableDrawer
      open={drawerOpen}
      handleDrawerChange={(newOpen) => setDrawerOpen(newOpen)}
      fullscreenLink={`/brain-regions/${selectedRegionId}`}
    >
      <BrainRegionContainer id={selectedRegionId} />
    </CloseableDrawer>

  );
};

export default RegionDrawer;
