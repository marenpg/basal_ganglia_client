import React from "react";
import { Box, Container, Typography, Link } from "@material-ui/core";
import { Header } from "../../components/Base/Headers";
import { StyleProps } from "./Information.jss";
import { InfoRow } from "../../components/Analysis/DataInformation/Common";



const InformationRoute: React.FC<StyleProps> = ({ classes }) => {
  return (
    <>
      <Header
        headerContainerClass={classes.drawerHeaderContainer}
        pageHeaderClass={classes.drawerPageHeader}
        subtitle="On this page we reference the data sets that are used in the solution"
        title={"Acknowledgements"}>
      </Header>
      <Box mt={4}>
        <Container maxWidth="sm">
          <Typography component="h2" variant="h3">
            {"The basal ganglia dataset"}
          </Typography>
          <Box display="flex" flexDirection="row" mt={1}>
            <Box fontWeight="500" pr={2} component="p" mt={0} mb={0}>{"Author: "}</Box>
            <Typography>{"Ingvild Elise Bjerke"} </Typography>
          </Box>
          <Box display="flex" flexDirection="row" mt={1}>
            <Box fontWeight="500" pr={2} component="p" mt={0} mb={0}>{"Citation: "}</Box>
            <Typography>
            {"Bjerke, I. E., Puchades, M., Bjaalie, J. G., & Leergaard, T. B. (2019). "}
            <Box fontStyle="italic" pr={2} component="span" mt={0} mb={0}>{"Database of quantitative cellular and subcellular morphological properties from rat and mouse basal ganglia  "}</Box>
            {"[Data set]. Human Brain Project Neuroinformatics Platform. "}
            <Link href="https://doi.org/10.25493%2FDYXZ-76U">{"DOI: 10.25493/DYXZ-76U"}</Link>
            </Typography>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default InformationRoute;

