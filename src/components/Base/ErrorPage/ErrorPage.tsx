import React from "react";
import { Box, Typography } from "@material-ui/core";
import { SimpleHeader } from "../Headers";
import { SimpleHeaderProps } from "../Headers/types";

interface ErrorPageProps extends SimpleHeaderProps {
    message: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ classes, title, subtitle, message }) => (
    <>
        <SimpleHeader classes={classes} title={title} subtitle={subtitle} />
        <Box
            mt={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Typography component="p" variant="subtitle1" color="error">
                {message}
            </Typography>
        </Box>
    </>
);
