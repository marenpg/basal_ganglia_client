import {
  Analysis,
  ReporterIncubation,
  DataType,
  Distribution,
  CellMorphology,
  Quantitation,
} from "../../utils/api/types";
import { getQuantitationSummary } from "./DataInformation/utils";

export const getSourceName = (sourceName: string) => {
  if (!sourceName) return "";
  if (sourceName.indexOf("_") < 0) return sourceName;
  return sourceName.replace("_", ", ");
};

export const getStringRep = (text: string, parenthesis: string): string | undefined => {
  if (!text) return undefined;

  return `${text} ${parenthesis ? `(${parenthesis})` : ""}`;
}

export const orderReporterIncubations = (incubations: ReporterIncubation[]) => {
  return incubations.sort((a, b) => (
    a.order === "Primary" && b.order === "Secondary" ? -1 : a.order === "Secondary" && b.order === "Primary" ? 1 : 0)
  );
}


export const getAnalysisTitle = (analysis: Analysis, selectedDataType: DataType) => {
  let title = "";
  const putativeIds = ["1", "2", "23"]
  const synapseIds = ["4", "5", "9", "10", "24"]
  const dendriteIds = ["11", "12", "13", "14", "17", "18"]

  if (analysis.dataType === "Quantitation") {
    title += "Quantitative estimate of ";
  }

  if (analysis.distributions.length > 0) {
    title += "Distribution of ";
  }

  if (analysis.cellMorphologies.length > 0) {
    title += "Morphology of ";
  }

  if (!selectedDataType) return title;

  if (putativeIds.includes(analysis.objectOfInterest?.NeuralStructure?.id)) {
    return `${title} ${analysis.cellTypePutative?.name?.toLowerCase()} cells in the ${selectedDataType.regionRecord.primaryRegion.name.toLowerCase()}`
  }

  if (synapseIds.includes(analysis.objectOfInterest?.NeuralStructure?.id)) {
    return `${title} synapses in the ${selectedDataType.regionRecord.primaryRegion.name.toLowerCase()}`
  }

  if (dendriteIds.includes(analysis.objectOfInterest?.NeuralStructure?.id)) {
    return `${title} dendrites in the ${selectedDataType.regionRecord.primaryRegion.name.toLowerCase()}`
  }

  return title;
}

export const getTotalEstimate = (selectedAnalysis: Analysis, selectedData: Distribution | CellMorphology | Quantitation | undefined): string => {
  if (selectedAnalysis?.dataType !== "Quantitation") {
    return "";
  }

  const data = selectedData as Quantitation;
  return getQuantitationSummary(data, selectedAnalysis);
}

export const getDataTypeShortName = (analysis: Analysis): string => {
  if (analysis.dataType === "Quantitation") return "quantitative estimate";
  if (analysis.dataType === "Distribution") return "distribution";
  if (analysis.dataType === "Morphology") return "morphology";
  return "";
}

export const getAtlasPrettyName = (analysis: Analysis): string => {
  if (analysis.specimen?.specie?.id === "1") return "Waxholm Space atlas of the Sprague-Dawley rat brain, version 4";
  if (analysis.specimen?.specie?.id === "2") return "Allen Mouse brain Common Coordinate Framework, v3 2015";
  return ""
}