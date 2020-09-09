import React from "react";
import { Box, Typography } from "@material-ui/core";

export const InfoRow: React.FC<{ title: string, value?: string | number }> = ({ title, value }) => (
  <>
    {value ? <Box display="flex" flexDirection="row">
      <Box fontWeight="500" pr={2}>{`${title}: `}</Box>
      <Typography>{value ?? "Not defined"} </Typography>
    </Box> : null
    }
  </>
)