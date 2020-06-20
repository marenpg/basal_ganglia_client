import React from "react";
import { Box, Typography } from "@material-ui/core";
import { HeaderProps } from "./types";

export const Header: React.FC<HeaderProps> = ({
  headerContainerClass,
  pageHeaderClass,
  title,
  topTitle,
  subtitle,
  titleSize,
  children
}) => {
  return (
    <>
      <div className={headerContainerClass}>
        <Box
          className={pageHeaderClass}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          {topTitle &&
            <Typography component="p" variant="subtitle1" color="inherit">
              {topTitle}
            </Typography>
          }
          <Typography component="h1" variant={titleSize ? titleSize : "h2"} color="inherit">
            {title}
          </Typography>
          <Typography component="p" variant="subtitle1" color="inherit">
            {subtitle}
          </Typography>
          {children}
        </Box>
      </div>
    </>
  )
};
