import React, { useState } from "react";
import { CellDescriptionProps } from "./types";
import { Box, ButtonBase, Link, Typography } from "@material-ui/core";

export const CellDescription: React.FC<CellDescriptionProps> = ({ description }) => {
  const [open, setOpen] = useState<boolean>(true);

  return <Box pb={2} pt={2}>
    <ButtonBase onClick={() => setOpen(!open)} style={{width:"100%", justifyContent: "flex-start"}}>
      <Typography component="h2" variant="h6">
        {"Description"}
      </Typography>
    </ButtonBase>
    {open && (
      <>
        <Typography component="p" variant="subtitle1">
          {description.description}
        </Typography>
        {description.iri &&
          <Box fontStyle="italic" display="flex" flexDirection="row" justifyContent="flex-end">
            <Typography>
              {"Collected from "}
              <Link href={description.iri}>
                {description.iri}
              </Link>
              {" using "}
              <Link href="https://scicrunch.org/browse/api-docs/index.html?url=https://scicrunch.org/swagger-docs/swagger.json">
                {"SciCrunch API"}
              </Link>
            </Typography>
          </Box>
        }
      </>
    )}
  </Box>
}