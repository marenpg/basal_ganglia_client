import React, { useState, useEffect } from "react";

import { Box, Typography } from "@material-ui/core";

import { CellTypesTreeWrapperProps } from "./types";
import { CellTypeTreeNode } from "../../utils/types";
import { CellTypesTree } from "./CellTypesTree";
import { filterCellTypes } from "./utils";

export const CellTypesTreeWrapper: React.FC<CellTypesTreeWrapperProps> = ({ classes, treeNodes, nameFilter }) => {
    const [filteredTree, setFilteredTree] = useState<CellTypeTreeNode[]>([]);

    useEffect(() => {
        setFilteredTree(getFilteredNodes(nameFilter, treeNodes));
    }, [treeNodes, nameFilter]);

    const getFilteredNodes = (filter: string, treeNodes: CellTypeTreeNode[]) => {
        if (!filter) {
            return treeNodes;
        }
        const matchingNodes = filterCellTypes(treeNodes, filter);
        return matchingNodes;
    };

    return (
        <Box
            mt={3}
            mb={2}
            display="flex"
            flexDirection="row"
            justifyContent="start"
        >
            {filteredTree.length > 0 ?
                (
                    <CellTypesTree classes={classes} cellTypeTree={filteredTree} />
                ) : (
                    <Box fontStyle="italic" mt={1}>
                        <Typography component="p" variant="subtitle1">
                            {"No cell types are matching the search."}
                        </Typography>
                    </Box>
                )
            }
        </Box>
    );
}