import React from "react";

import { StyleProps } from "./CellTypes.jss";
import LoadingPage from "../../components/Base/LoadingPage";
import ErrorPage from "../../components/Base/ErrorPage";
import CellTypes from "../../components/CellTypes";
import { CellType } from "../../utils/api/types";
import { CellTypesDataContext } from "../../providers/contexts";
import useCellTypesHooks from "../../hooks/useCellTypesHooks";
import { CellTypesAndSpecieData } from "../../providers/types";

const CellTypesRoute: React.FC<StyleProps> = ({ classes }) => {
  const { loading, data, error } = useCellTypesHooks<CellTypesAndSpecieData>();

  if (loading && !error) {
    return <LoadingPage classes={classes} title="Cell types" subtitle="" />;
  }

  if (error || (!loading && !data)) {
    return <ErrorPage
      classes={classes}
      title="Cell types"
      subtitle=""
      message="Oups, an error occurred while fetching cell types" />
  }

  const cellTypes: CellType[] = []
  data?.CellGroup.map(cg => cg.cellClassesInGroup.map(cg => cg.cellTypesInClass.map(ct => cellTypes.push(ct))));
  data!.CellType = cellTypes;
  return (
    <>
      <CellTypesDataContext.Provider value={data!}>
        <CellTypes />
      </CellTypesDataContext.Provider>
    </>
  );
};

export default CellTypesRoute;

