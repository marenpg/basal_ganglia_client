
import React, { useContext } from "react";

import { CellTypeContext } from "../../providers/contexts";

import { Header } from "../../components/Base/Headers";
import { StyleProps, style } from "./CellTypePage.jss";
import { CellTypeTabs } from "../../components/CellTypeComponents/CellTypeTabs";
import { Typography } from "@material-ui/core";
import { SpecieDescription } from "../../components/CellTypeComponents/SpecieDescription";

const CellTypePage: React.FC<StyleProps> = ({ classes }) => {
  const { selectedCellType } = useContext(CellTypeContext);

  return (
    <>
      <Header
        headerContainerClass={classes.drawerHeaderContainer}
        pageHeaderClass={classes.drawerPageHeader}
        subtitle={selectedCellType!.classMembership?.name}
        title=""
      >
        <Typography component="h1" variant="h4">
          {selectedCellType!.name}
        </Typography>
        <SpecieDescription />
      </Header>
      <CellTypeTabs />
    </>
  );
};

export default style(CellTypePage);
