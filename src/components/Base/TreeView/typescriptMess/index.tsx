// import React from "react";

// import { AddCircle, RemoveCircle, Info } from "@material-ui/icons";
// import TreeView from "@material-ui/lab/TreeView";

// import { TreeNodes } from "./TreeNodes";
// import { useTreeViewStyles } from "./TreeView.jss";
// import { CustomTreeViewProps } from "./types";

// const CustomizedTreeView: React.FC<CustomTreeViewProps> = ({ nodes, expandedIds, handleTreeClick }) => {
//   const classes = useTreeViewStyles();
//   return (
//     <TreeView
//       className={classes.root}
//       defaultExpanded={expandedIds}
//       defaultCollapseIcon={<RemoveCircle color="secondary" />}
//       defaultExpandIcon={<AddCircle color="secondary" />}
//     >
//       {Object.entries(nodes).map(([_, node]) => (
//         <TreeNodes
//           key={node.id}
//           label={node.name}
//           subRegions={node.subRegions}
//           nodeId={node.id}
//           handleTreeClick={handleTreeClick}
//         />
//       ))}
//     </TreeView>
//   );
// };

// export default CustomizedTreeView;

export {};