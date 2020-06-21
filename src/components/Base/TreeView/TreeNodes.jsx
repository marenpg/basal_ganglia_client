import React from "react";
import PropTypes from "prop-types";
import { fade, withStyles } from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import { Collapse, ButtonBase, Box, Link } from "@material-ui/core";
// import InfoIcon from "@material-ui/icons/Info";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { useTreeViewStyles } from "./TreeView.jss";

function TransitionComponent(props) {
  const style = useSpring({
    from: { opacity: 0, transform: "translate3d(20px,0,0)" },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = withStyles((theme) => ({
  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
));

export const TreeNodes = ({ node, handleTreeClick }) => {
  const classes = useTreeViewStyles();

  const LabelItem = () => (
    <Box display="flex" alignItems="center">
      {node.link ? (
        <Link
          href={node.link}
          className={classes.treeButton}
          title={`See analyses of ${node.name} in region`}
        >
          {node.matching ? (
            <Box fontStyle="italic">{node.name}</Box>
          ) : (
            node.name
          )}
        </Link>
      ) : (
        <ButtonBase
          className={classes.treeButton}
          title={`See information about ${node.name}`}
          onClick={handleTreeClick(node)}
        >
          {node.matching ? (
            <Box fontStyle="italic">{node.name}</Box>
          ) : (
            node.name
          )}
        </ButtonBase>
      )}
    </Box>
  );

  if (node.children && node.children.length > 0) {
    return (
      <StyledTreeItem label={<LabelItem />} nodeId={node.id}>
        {node.children.map((child) => (
          <TreeNodes
            key={child.id}
            node={child}
            handleTreeClick={handleTreeClick}
          />
        ))}
      </StyledTreeItem>
    );
  }
  return <StyledTreeItem label={<LabelItem />} nodeId={node.id} />;
};
