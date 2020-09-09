import React, { useContext, useState, useEffect } from "react";

import { Box } from "@material-ui/core";
import { AnalysisContext } from "../../providers/contexts";

import { InformationCard, InformationTable } from "../Base/InformationCard";
import { TableElements } from "./types";
import { orderReporterIncubations } from "./utils";
import analysis from "../../pages/analysis";
import { ReporterIncubation } from "../../utils/api/types";

export const AnalysisInformation: React.FC = () => {
  const [lfElements, setLfElements] = useState<TableElements[]>([]);
  const [emElements, setEmElements] = useState<TableElements[]>([]);
  const [sectioningElements, setSectioningElements] = useState<TableElements>([]);
  const [reporterElements, setReporterElements] = useState<TableElements[]>([]);

  const { selectedAnalysis } = useContext(AnalysisContext);

  let count = 0;
  if (lfElements.length) { count += 1 };
  if (emElements.length) { count += 1 };
  if (sectioningElements.length) { count += 1 };
  if (reporterElements.length) { count += 1 };
  const width = count === 1 ? "100%" : (count === 2 ? "47%" : (count === 3) ? "29%" : "22%");

  useEffect(() => {
    selectedAnalysis?.lightFluorescenceMicroscopes && selectedAnalysis?.lightFluorescenceMicroscopes?.length > 0 && (
      setLfElements(selectedAnalysis.lightFluorescenceMicroscopes.map(l => ([
        { title: "Mounting medium", value: l.mountingMedium?.name },
        { title: "Refraction medium", value: l.refractionMedium },
        { title: "Numerical aperature", value: l.numericalAperature },
        { title: "Objective lens", value: l.objectiveLens },
        { title: "Total magnification", value: l.totalMagnification },
        { title: "Pixel size", value: l.pixelSize },
        { title: "Optical slice size", value: l.opticalSliceSize ? `${l.opticalSliceSize} µm` : "" },
        { title: "Microscope", value: l.microscope?.type },
      ]))));

    selectedAnalysis?.electronMicroscopes && selectedAnalysis?.electronMicroscopes?.length > 0 && (
      setEmElements(selectedAnalysis.electronMicroscopes.map(e => ([
        { title: "Grid type", value: e.gridType },
        { title: "Magnification", value: e.magnification },
        { title: "Microscope", value: e.microscope?.type },
      ]))));

    selectedAnalysis?.sectioningDetail && (
      setSectioningElements([
        { title: "Section thickness", value: selectedAnalysis.sectioningDetail.sectionThickness ? `${selectedAnalysis.sectioningDetail.sectionThickness} μm` : "" },
        { title: "Section orientation", value: selectedAnalysis.sectioningDetail.sectionOrientation },
        { title: "Sectioning instrument", value: selectedAnalysis.sectioningDetail.SectioningInstrument?.name },
      ]));

    selectedAnalysis?.reporterIncubations && selectedAnalysis?.reporterIncubations.length > 0 && (
      setReporterElements(orderReporterIncubations(selectedAnalysis.reporterIncubations).map(incubation => ([
        { title: "Order", value: incubation.order },
        { title: "Name", value: incubation.Reporter?.name },
        { title: "Type", value: incubation.Reporter?.type },
        { title: "Unique Id", value: incubation.Reporter?.rrid, link: getRRIDLink(incubation) },
        { title: "Concentration", value: incubation.concentration },
        { title: "Time", value: incubation.time ? `${incubation.time} hours` : undefined },
        { title: "Temperature", value: incubation.temperature },
        { title: "Label", value: incubation.Reporter?.label?.name },
        { title: "Target", value: incubation.Reporter?.target?.phenotype },
        { title: "Origin specie", value: incubation.Reporter?.originSpecie },
        { title: "Comment", value: incubation.Reporter?.comment },
      ]))));

  }, [selectedAnalysis]);

  const getRRIDLink = (incubation: ReporterIncubation) => {
    if (incubation.Reporter?.rrid && incubation.Reporter?.rrid.startsWith("RRID")) {
      return `/analyses/specie=${selectedAnalysis?.specimen?.specie?.id}&rrids=[${incubation.Reporter.rrid}]`;
    }
    return "";
  }

  if (!selectedAnalysis) return <></>;
  // TODO Shrinkage_correction
  // Visualization_method

  return (
    <>
      <Box component="p" mt={4} mb={2}>
        {`For this analysis ${selectedAnalysis.visualizationMethod?.name?.toLowerCase()} was performed to visualize the object of interest`}
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="flex-start">
        {reporterElements.length > 0 &&
          <InformationCard heading="Antibodies" width={width}>
            {reporterElements.map(elements => (
              <Box mt={2} key={`${elements[2].value}-${elements[0].value}-${elements[1].value}-${elements[3].value}`}>
                <Box component="p" mt={0} mb={1} textAlign="left">
                  {elements.shift()?.value}
                </Box>
                <InformationTable elements={elements} />
              </Box>
            ))}
          </InformationCard>
        }

        {sectioningElements.length > 0 ? (
          <InformationCard heading="Sectioning details" width={width}>
            <Box mt={2}>
              <InformationTable elements={sectioningElements} />
            </Box>
          </InformationCard>
        ) : null
        }

        {emElements.length > 0 ? (
          <InformationCard heading="Microscopy details" width={width}>
            {emElements.map(elements => (
              <Box mt={2} key={`${elements[0].title}-${elements[0].value}`}>
                <InformationTable elements={elements} />
              </Box>
            ))}
          </InformationCard>
        ) : null
        }
        {lfElements.length > 0 ? (
          <InformationCard heading="Microscopy details" width={width}>
            {lfElements.map(elements => (
              <Box mt={2} key={`${elements[0].title}-${elements[0].value}`}>
                <InformationTable elements={elements} />
              </Box>
            ))}
          </InformationCard>
        ) : null
        }
      </Box>
    </>
  );
};
