import { Analysis, CellMorphology, Distribution, Quantitation } from "../../../utils/api/types";
import { TableElements } from "../types";

export const putativeIds = ["1", "2", "23"];
export const synapseIds = ["4", "5", "9", "10", "24"];
export const dendriteIds = ["11", "12", "13", "14", "17", "18"];

export const getTableElementsOnDataType = (
  selectedAnalysis: Analysis,
  selectedDataType: Quantitation | Distribution | CellMorphology
): TableElements => {

  if (selectedAnalysis.dataType === "Quantitation") {
    return selectedDataType ? getTableElementsQuantitation(selectedDataType as Quantitation) : [];
  }

  if (selectedAnalysis.dataType === "Distribution") {
    return selectedDataType ? getTableElementsDistribution(selectedDataType as Distribution) : [];
  }

  if (selectedAnalysis.dataType === "Morphology") {
    return selectedDataType ? getTableElementsCellMorphology(selectedDataType as CellMorphology) : [];
  }

  return [];
};

export const getTableElementsDistribution = (data: Distribution) => {
  const analysisType = [data.distributionDimensions, data.analysisTypePrimary, data.analysisTypeSecondary].join(", ");
  return [
    { title: "Section sampling", value: data.sectionSampling, tooltip: "The method of sampling sections, defined as exhaustive (all sections), systematic random (random start with uniform fraction), preferential, or N/A." },
    { title: "Sampling fraction", value: data.samplingFraction, tooltip: "The ratio of sampled to unsampled sections" },
    { title: "Subsectional sampling", value: data.subsectionalSampling, tooltip: "The method for counting object of interest within a section" },
    { title: "Final estimate basis", value: data.finalEstimateBasis, tooltip: "The basis of the final estimate" },
    { title: "Distribution", value: data.distribution },
    { title: "Analysis type", value: analysisType },
  ];
};

export const getTableElementsQuantitation = (data: Quantitation) => {
  return [
    { title: "Section sampling", value: data.sectionSampling, tooltip: "The method of sampling sections, defined as exhaustive (all sections), systematic random (random start with uniform fraction), preferential, or N/A." },
    { title: "Sampling fraction", value: data.samplingFraction, tooltip: "The ratio of sampled to unsampled sections" },
    { title: "Subsectional sampling", value: data.subsectionalSampling, tooltip: "The method for counting object of interest within a section" },
    { title: "Final estimate basis", value: data.finalEstimateBasis, tooltip: "The basis of the final estimate" },
    { title: "Estimate relevance", value: data.estimateRelevance },
  ];
};

const getTableElementsCellMorphology = (data: CellMorphology) => {
  return [
    { title: "Neuromorpho Id ", value: data.neuromorphoId },
    { title: "Soma surface", value: data.somaSurface },
    { title: "Number ofStems", value: data.numberOfStems },
    { title: "Number ofBifurcations", value: data.numberOfBifurcations },
    { title: "Number ofBranches", value: data.numberOfBranches },
    { title: "Overall width", value: data.overallWidth },
    { title: "Overall height", value: data.overallHeight },
    { title: "Overall depth", value: data.overallDepth },
    { title: "Average branch diameter", value: data.averageBranchDiameter },
    { title: "Average contraction", value: data.averageContraction },
    { title: "Total arbor length", value: data.totalArborLength },
    { title: "Total arbor surface", value: data.totalArborSurface },
    { title: "Total arbor volume", value: data.totalArborVolume },
    { title: "Max euclidean distance", value: data.maxEuclideanDistance },
    { title: "Max path distance", value: data.maxPathDistance },
    { title: "Max branch order", value: data.maxBranchOrder },
    { title: "Total fragmentation", value: data.totalFragmentation },
    { title: "Partition asymmetry", value: data.partitionAsymmetry },
    { title: "Average ralls", value: data.averageRalls },
    {
      title: "Average bifurcation angle local",
      value: data.averageBifurcationAngleLocal,
    },
    {
      title: "Average bifurcation angle remote",
      value: data.averageBifurcationAngleRemote,
    },
    { title: "Fractal dimension", value: data.fractalDimension },
    { title: "Physical integrity", value: data.physicalIntegrity },
    { title: "structural domains", value: data.structuralDomains },
    { title: "Morphological attributes", value: data.morphologicalAttributes },
    { title: "Original format", value: data.originalFormat },
  ];
};

type Data = Quantitation | Distribution | CellMorphology | undefined;

export const getSoftwareElements = (data: Data) => {
  if (!data || !("software" in data)) return;
  return([
  { title: "Name", value: data?.software?.name },
  { title: "RRID", value: data?.software?.rrid },
])};


export const getStereologyElements= (data: Data): TableElements => {
  if (!data || !("stereology" in data)) return [];

  return ([
  // { title: "Name", value: data.stereology.name },
  { title: "Probe", value: data.stereology.probe },
  { title: "Identification featuree", value: data.stereology.identificationFeature },
  { title: "Disector height", value: data.stereology.disectorHeight },
  { title: "Area subfraction", value: data.stereology.areaSubfraction },
  { title: "Height subfraction", value: data.stereology.heightSubfraction },
  { title: "Investigated sections", value: data.stereology.investigatedSections },
  { title: "Investigated fields", value: data.stereology.investigatedFields },
  { title: "Counted objects", value: data.stereology.countedObjects },
  { title: "Coefficient of error", value: data.stereology.coefficientOfError },
  { title: "Estimated volume", value: data.stereology?.volumeUnit ? `${data.stereology.estimatedVolume} ${data.stereology.volumeUnit}`: data.stereology?.estimatedVolume },
  { title: "Any except probe", value: data.stereology.anyExceptProbe },
])};

export const getQuantitationSummary = (qunatitation: Quantitation): string => {
  console.log(qunatitation);
  if(qunatitation.number){
    if(!qunatitation.originalExtent) return "";
    const qNumber = qunatitation.originalExtent === "bilateral" ? qunatitation.number/2 : qunatitation.number
      return `Estimated total number was ${qNumber} ± ${qunatitation.numberSD} (mean ± SD) unilaterally`;
  }
    if(qunatitation.density) {
      return `Estimated total number was ${qunatitation.density} ± ${qunatitation.densitySD} (mean ± SD) per ${qunatitation.densityUnit}`;
    }

    return "";
};
//Synaptic target: [Quantitations]_[Cellular_ID] [Quantitations]_[Cellular_target_region]

export const getQuantitationData = (analysis: Analysis, quantitation: Quantitation): TableElements => {
  const elems = [
    {title: "Cell type",value: analysis.cellTypePutative?.name},
    {title: "Object of intrest",value: analysis.objectOfInterest?.NeuralStructure?.name},
    {title: "Synaptic target" },
    {title: "Recognition critera",value: analysis.objectOfInterest?.recognitionCriteria},
  ]

  const OOIId = analysis.objectOfInterest?.NeuralStructure?.id;
  if(!OOIId || !quantitation || putativeIds.includes(OOIId)) return elems;

  if(synapseIds.includes(OOIId)){
    elems[2].title = "Synaptic target";
    elems[2].value = quantitation.targetCell?.name 
      ? `${quantitation.targetCell?.name}, ${quantitation.targetCellularRegion?.name}`
      : quantitation.targetCellularRegion?.name;
      return elems;
  }

  if(synapseIds.includes(OOIId)){
    elems[2].title = "Counted segment";
    elems[2].value = quantitation.targetCellularRegion?.name;
  }

  return elems;
}

export const getDistributionSummary = (distribution: Distribution): string => {
    return "Todo get summary";
};

export const getDistributionData = (analysis: Analysis): TableElements => {
  return [
    {title: "Cell type",value: analysis.cellTypePutative?.name},
    {title: "Object of intrest",value: analysis.objectOfInterest?.NeuralStructure?.name},
    {title: "Recognition critera",value: analysis.objectOfInterest?.recognitionCriteria},
  ]
}