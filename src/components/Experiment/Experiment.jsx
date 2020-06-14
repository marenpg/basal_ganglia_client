import React from "react";
import { useQuery } from "@apollo/react-hooks";

import {
  Box,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";

import { ExperimentInformation } from "./ExperimentInformation";
import { GET_EXPERIMENT } from "./graphql";

export const Experiment = ({ classes, match }) => {
  const filter = { id: match.params.id };
  const { loading, data, error } = useQuery(GET_EXPERIMENT, {
    variables: {
      filter
    }
  });

  return (
    <>
      {loading && !error && (
        <Grid container alignItems="center" justify="center">
          <CircularProgress color="inherit" />
        </Grid>
      )}
      {error && !loading && (
        <Grid container alignItems="center" justify="center">
          <Box mt={10}>Error</Box>
        </Grid>
      )}
      {!data && (
        <Grid container alignItems="center" justify="center">
          <Box mt={10}>No data found</Box>
        </Grid>
      )}
      {data && !loading && !error && (
        <>
          <div className={classes.header}>
            <Typography component="p" variant="subtitle1" color="inherit">
              Experiment:
            </Typography>
            <Typography
              component="h1"
              variant="h1"
              color="inherit"
              align="center"
            >
              {data.Experiment[0].name}
            </Typography>
          </div>

          <ExperimentInformation experiment={data.Experiment[0]} />
        </>
      )}
    </>
  );
};
