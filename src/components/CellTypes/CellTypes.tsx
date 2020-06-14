import React, { useState, useEffect, useContext } from "react";

import { Container } from "@material-ui/core";

import { CellTypeTreeNode } from "../../utils/types";
import { Header } from "../Base/Headers/Header";
import SearchField from "../Base/Search";
import { CellTypesTreeWrapper } from "./CellTypesTreeWrapper";
import { getCellTypesAndTreeNodes } from "./utils";
import { StyleProps } from "./CellTypes.jss";
import { CellTypesDataContext } from "../../providers/contexts";

const CellTypes: React.FC<StyleProps> = ({ classes }) => {
  const { CellGroup } = useContext(CellTypesDataContext);
  const [filteredCellTypeTree, setFilteredCellTypeTree] = useState<CellTypeTreeNode[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>("");

  useEffect(() => {
    if (CellGroup) {
      const { treeNodes } = getCellTypesAndTreeNodes(CellGroup);
      setFilteredCellTypeTree([...treeNodes]);
    }

  }, [CellGroup]);

  const handleSearchFilterChange = () => (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchFilter(event.target.value);
  };

  return (
    <>
      <Header
        headerContainerClass={classes.headerContainer}
        pageHeaderClass={classes.pageHeader}
        subtitle={"Search for cell types"}
        title={"Cell types"} />
      <Container maxWidth="sm">
        <SearchField
          id="cell-types-search"
          label="Search for cell types"
          searchValue={searchFilter}
          handleSearch={handleSearchFilterChange()}
        />
        <CellTypesTreeWrapper
          classes={classes}
          treeNodes={filteredCellTypeTree}
          nameFilter={searchFilter} />
      </Container>
    </>
  );
};

export default CellTypes;
