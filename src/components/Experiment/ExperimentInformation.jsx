import React from "react";

import {
  Box,
  List,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

import {
  InformationBox,
  InformationItem,
  InformationListLinkItem
} from "../Base/InformationBox";
import LightDivider from "../Base/LightDivider";
import { BgTable, BgLinkTableCell } from "../Base/BgTable";

export const ExperimentInformation = ({ experiment }) => {
  const {
    name,
    animalStatus,
    ageLowerLimit,
    ageUpperLimit,
    weightLowerLimit,
    weightUpperLimit,
    perfusionFixMedium,
    anaesthetic,
    source,
    brainRegions,
    analyses
  } = experiment;

  return (
    <Box display="flex" flexDirection="column">
      <InformationBox title="Key information" color="primary">
          <InformationItem title="Name" val={name} />
          <InformationItem title="Animal status" val={animalStatus} />
          <InformationItem
            title="Age limits"
            val={`${ageLowerLimit ? ageLowerLimit : "N/A"}-${
              ageUpperLimit ? ageUpperLimit : "N/A"
            }`}
          />
          <InformationItem
            title="Weight limits"
            val={`${weightLowerLimit ? weightLowerLimit : "N/A"}-${
              weightUpperLimit ? weightUpperLimit : "N/A"
            }`}
          />
        {anaesthetic && anaesthetic.name && (
          <InformationItem title="Anaesthetic" val={anaesthetic.name} />
        )}
        {perfusionFixMedium && perfusionFixMedium.name && (
          <InformationItem
            title="Perfusion fix medium"
            val={perfusionFixMedium.name}
          />
        )}
      </InformationBox>
      <LightDivider />
      {source && (
        <>
          <InformationBox title="Source collected from">
              <InformationItem title="Title" val={source.title} />
              <InformationItem
                title="Source name"
                val={source.sourceName}
              />
              <InformationItem title="Source type" val={source.type} />
              <InformationItem
                title="Publication year"
                val={source.publicationYear}
              />
              {source.collectedFrom && (
                <InformationItem
                  title="Collected from"
                  val={source.collectedFrom.name}
                />
              )}
          </InformationBox>
          <LightDivider />
        </>
      )}
      {brainRegions && (
        <>
          <InformationBox title="Brain regions observer in">
              {brainRegions.map(region => (
                <InformationListLinkItem
                  key={region.id}
                  to={`/brain-regions/${region.id}`}
                  text={region.name}
                />
              ))}
          </InformationBox>
          <LightDivider />
        </>
      )}
      {analyses && (
        <InformationBox title="Analyses">
          <Typography component="p" variant="subtitle1" align="center">
            The analyses performed in this experiment
          </Typography>
          <BgTable>
            <TableHead>
              <TableRow>
                <TableCell>Analysis name</TableCell>
                <TableCell>Object of interest</TableCell>
                <TableCell>Number of animals</TableCell>
                <TableCell>Specimen</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {analyses.map(analysis => (
                <TableRow key={analysis.id}>
                  <TableCell component="th" scope="row">
                    {analysis.name}
                  </TableCell>
                  <TableCell>
                    {analysis.objectOfInterest.name
                      ? analysis.objectOfInterest.name
                      : "-"}
                  </TableCell>
                  <TableCell>{analysis.numberOfAnimals}</TableCell>
                  <TableCell>
                    {analysis.specimen.name ? analysis.specimen.name : "-"}
                  </TableCell>
                  <BgLinkTableCell
                    title={"Go to analysis"}
                    ariaLabel={"Go to analysis"}
                    href={`/analyses/${analysis.id}`}
                  />
                </TableRow>
              ))}
            </TableBody>
          </BgTable>
        </InformationBox>
      )}
    </Box>
  );
};
