import React from "react";
import { Box, Typography, Container } from "@material-ui/core";
import { StyleProps } from "./Home.jss";
import { HeadingBox } from "./HeadingBox";
export const Home: React.FC<StyleProps> = ({ classes }) => (
  <>
    <div className={classes.header}>
      <Typography component="h1" variant="h1" color="inherit">
        Basal Ganglia Data
      </Typography>
    </div>
    <Container maxWidth="lg" className={classes.body}>
      <Box display="flex" justifyContent="space-around">
        <HeadingBox classes={classes} url="/brain-regions" imgSrc="/img/icons/brain.svg" imgTitle="Brain icon" heading="Brain regions" description="" />
        <HeadingBox classes={classes} url="/cell-types" imgSrc="/img/icons/cell.svg" imgTitle="Neuron icon" heading="Cell types" description="" />
        <HeadingBox classes={classes} url="/analyses" imgSrc="/img/icons/experiment.svg" imgTitle="Analyses icon" heading="Analyses" description="" />
      </Box>
    </Container>
  </>
);
