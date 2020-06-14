import React, { useEffect } from "react";

import { AddCircle, RemoveCircle, Info } from "@material-ui/icons";
import TreeView from "@material-ui/lab/TreeView";

import { TreeNodes } from "./TreeNodes";
import { useTreeViewStyles } from "./TreeView.jss";

const CustomizedTreeView = ({ nodes, expandedIds, handleTreeClick }) => {
  const [expanded, setExpanded] = React.useState([]);

  useEffect(()=>{
    setExpanded(expandedIds);
  },[expandedIds]);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const classes = useTreeViewStyles();
  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<RemoveCircle color="secondary" />}
      defaultExpandIcon={<AddCircle color="secondary" />}
      expanded={expanded}
      selected={[]}
      onNodeToggle={handleToggle}
    >
      {nodes.map(node => (
        <TreeNodes
          key={node.id}
          node={node}
          handleTreeClick={handleTreeClick}
        />
      ))}
    </TreeView>
  );
};

export default CustomizedTreeView;
