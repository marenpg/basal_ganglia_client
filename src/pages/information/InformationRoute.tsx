import React from "react";
import { Box, Container, Typography, Link } from "@material-ui/core";
import { Header } from "../../components/Base/Headers";
import { StyleProps } from "./Information.jss";
import { InfoRow } from "../../components/Analysis/DataInformation/Common";

interface CitationProps {
  index: number;
  authors: string;
  year: number;
  title: string;
  journal: string;
}

const Citation: React.FC<CitationProps> = ({ index, authors, year, title, journal, children }) => (
  <Box display="flex" flexDirection="row" mt={1}>
    <Typography>
      {`[${index}] ${authors} (${year}). ${title}. `}
      <Box fontStyle="italic" pr={2} component="span" mt={0} mb={0}>{journal}</Box>
      {children}
    </Typography>
  </Box>
)


const InformationRoute: React.FC<StyleProps> = ({ classes }) => {
  return (
    <>
      <Header
        headerContainerClass={classes.drawerHeaderContainer}
        pageHeaderClass={classes.drawerPageHeader}
        title={"Acknowledgements"}
        subtitle=""
      >
        <Container maxWidth="sm">
          <Typography component="p" variant="subtitle1" color="inherit">
            {"This web site gives a unified view of data from the Murine basal ganglia database [1,2], Brain Architecture Management System [3,4] and Neuromorpho.org [5,6]."}
          </Typography>
        </Container>
      </Header>
      <Box mt={4}>
        <Container maxWidth="sm">
          <Citation
            index={1}
            authors={"Bjerke, I. E., Puchades, M., Bjaalie, J. G., & Leergaard, T. B."}
            year={2019}
            title="Database of quantitative cellular and subcellular morphological properties from rat and mouse basal ganglia"
            journal="Manuscript"
          />

          <Citation
            index={2}
            authors={"Bjerke, I. E., Puchades, M., Bjaalie, J. G., & Leergaard, T. B."}
            year={2019}
            title="Database of quantitative cellular and subcellular morphological properties from rat and mouse basal ganglia [Data set]"
            journal="Human Brain Project Neuroinformatics Platform"
          >
            <Link href="https://doi.org/10.25493%2FDYXZ-76U">{"DOI: 10.25493/DYXZ-76U"}</Link>
          </Citation>

          <Citation
            index={3}
            authors={"Bota M, Dong H-W & Swanson LW"}
            year={2005}
            title="Brain Architecture Management System"
            journal="Neuroinformatics. 3(1)"
          >
            <Link href="https://doi.org/10.1385/NI:3:1:015">{"DOI: 10.1385/NI:3:1:015"}</Link>
          </Citation>

          <Box display="flex" flexDirection="row" mt={1}>
            <Typography>
              {"[4] Brain Architecture Management System. "}
              <Link href="https://bams2.bams1.org/">{"https://bams2.bams1.org/"}</Link>
            </Typography>
          </Box>

          <Citation
            index={5}
            authors={"Ascoli G, Donohue D, Halvi M"}
            year={2007}
            title="NeuroMorpho.Org: A central resource for neuronal morphologies"
            journal="Journal of Neuroscience. 27(35) "
          >
            <Link href="https://doi.org/10.1523/JNEUROSCI.2055-07.2007">{"DOI: 10.1523/JNEUROSCI.2055-07.2007"}</Link>
          </Citation>

          <Box display="flex" flexDirection="row" mt={1}>
            <Typography>
              {"[6] Neuromorpho.org. "}
              <Link href="http://www.neuromorpho.org">{"www.neuromorpho.org"}</Link>
            </Typography>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default InformationRoute;

