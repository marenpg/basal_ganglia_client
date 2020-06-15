import React, { useContext, useState, useEffect } from "react";

import { Box, Typography, Container } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { TableElements } from "./types";
import { getStringRep } from "./utils";

export const AnimalInformation: React.FC = () => {
  const [genInfoElements, setGenInfoElements] = useState<TableElements>([]);

  const { selectedAnalysis } = useContext(AnalysisContext);

  useEffect(() => {
    if (!selectedAnalysis?.specimen) return;

    const specimen = selectedAnalysis.specimen;

    setGenInfoElements([
      { title: "Specie", value: specimen.specie?.name },
      { title: "Strain", value: getStringRep(specimen.strain?.name, specimen.strain?.ontology) },
      { title: "Substrain", value: getStringRep(specimen.substrain?.name, specimen.substrain?.ontology) },
      { title: "Genotype", value: getStringRep(specimen.transgenicLine?.name, specimen.transgenicLine?.RRID) ?? "Wildtype" },
      { title: "Sex", value: getStringRep(specimen.sex?.name, specimen.sex?.ontology) },
      { title: "Age category", value: getStringRep(specimen.ageCategory?.name, specimen.ageCategory?.description) },
      { title: "Age range", value: selectedAnalysis.experiment.ageLowerLimit ? `${selectedAnalysis.experiment.ageLowerLimit} - ${selectedAnalysis.experiment.ageUpperLimit}` : "" },
      { title: "Weight range", value: selectedAnalysis.experiment.weightLowerLimit ? `${selectedAnalysis.experiment.weightLowerLimit} - ${selectedAnalysis.experiment.weightUpperLimit}` : "" },
    ]);
  }, [selectedAnalysis]);

  const InfoRow: React.FC<{ title: string, value?: string | number }> = ({ title, value }) => (
    <>
      {value && <Box display="flex" flexDirection="row">
        <Box fontWeight="500" pr={2}>{`${title}: `}</Box>
        <Typography>{value ?? "Not defined"} </Typography>
      </Box>
      }
    </>
  )

  if (!selectedAnalysis) return <></>;

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        {selectedAnalysis.numberOfAnimals &&
          <InfoRow title="Number of animals used in analysis" value={selectedAnalysis.numberOfAnimals.toString()} />
        }
        <Box mt={2}>
          {genInfoElements.length > 0 &&
            genInfoElements.map(element => (
              <InfoRow key={element.title} title={element.title} value={element.value} />
            ))
          }
        </Box>
        {selectedAnalysis.experiment.animalStatus &&
          <Box mt={2}>
            <InfoRow title="Animal status" value={selectedAnalysis.experiment.animalStatus} />
          </Box>
        }
      </Box>
    </Container>
  );
};
