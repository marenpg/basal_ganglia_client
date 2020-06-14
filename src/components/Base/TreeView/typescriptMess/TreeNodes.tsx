// import React from "react";
// import PropTypes from "prop-types";
// import { fade, withStyles } from "@material-ui/core/styles";
// import TreeItem from "@material-ui/lab/TreeItem";
// import { Collapse, ButtonBase } from "@material-ui/core";
// import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
// import { TreeNodesProps, StyledTreeItemProps, TransitionComponentProps } from "./types";
// import { threeItemStyles} from "./TreeView.jss";

// const TransitionComponent: React.FC<any> = (props) => {
//   const style = useSpring({
//     from: { opacity: 0, transform: "translate3d(20px,0,0)" },
//     to: {
//       opacity: props.in ? 1 : 0,
//       transform: `translate3d(${props.in ? 0 : 20}px,0,0)`
//     }
//   });

//   return (
//     <animated.div style={style}>
//       <Collapse {...props} />
//     </animated.div>
//   );
// }

// const threeItemStyle = withStyles(threeItemStyles);



// const StyledTreeWrapper: React.FC<StyledTreeItemProps> = ({ label, nodeId }) => (
//   <TreeItem nodeId={nodeId} label={label} TransitionComponent={TransitionComponent} />
// );

// const StyledTreeItem = withStyles(threeItemStyle)(StyledTreeWrapper);

// export const TreeNodes: React.FC<TreeNodesProps> = ({ label, subRegions, nodeId, handleTreeClick }) => {
//   const LabelItem: React.FC = () => (
//     <ButtonBase
//       title={`See information about ${label}`}
//       onClick={handleTreeClick(nodeId)}
//     >
//       {label}
//     </ButtonBase>
//   );

//   if (subRegions.length > 0) {
//     return (
//       <StyledTreeItem label={<LabelItem/>} nodeId={nodeId}>
//         {subRegions.map(region => (
//           <TreeNodes
//             key={region.id}
//             label={region.name}
//             subRegions={region.subRegions}
//             nodeId={region.id}
//             handleTreeClick={handleTreeClick}
//           />
//         ))}
//       </StyledTreeItem>
//     );
//   }
//   return <StyledTreeItem label={<LabelItem/>} nodeId={nodeId} />;
// };


export {};