import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { SimpleHeader } from "../Headers";
import { SimpleHeaderProps } from "../Headers/types";

export const LoadingPage: React.FC<SimpleHeaderProps> = ({classes, title, subtitle}) => (
    <>
        <SimpleHeader classes={classes} title={title} subtitle={subtitle} />
        <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress color="inherit" />
        </Box>
    </>
);
