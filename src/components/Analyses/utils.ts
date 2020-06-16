import { Analysis, DataType } from "../../utils/api/types";
import { CheckBoxElement } from "../../utils/types";
import { TableSort } from "./types";
import { Mark } from "@material-ui/core";
import { TableRow } from "../Base/BgTable/types";
import { sortElements } from "../../utils";


const sortFunction = (a:string, b:string, order: string) => {
  if (!a) a= "";
  if(!b) b= "";

  if (order === "asc") {
    return a > b? 1 : a < b ? -1 : 0
  }

  return a < b ? 1 : a > b ? -1 : 0
}

export const sortAnalyses = (
  analysisToSort: Analysis[],
  order: string,
  orderBy: TableSort
): Analysis[] => {
  if (orderBy === "strain") {
    return analysisToSort.sort((a, b) => sortFunction(a.specimen?.strain?.name, b.specimen?.strain?.name, order));
  }
  if (orderBy === "substrain") {
    return analysisToSort.sort((a, b) => sortFunction(a.specimen?.substrain?.name, b.specimen?.substrain?.name, order));
  }
  if (orderBy === "sex") {
    return analysisToSort.sort((a, b) => sortFunction(a.specimen?.sex?.name, b.specimen?.sex?.name, order));
  }

  return analysisToSort.sort((a, b) => sortFunction(a[orderBy], b[orderBy], order));
};

export const getAnalysesOnSpecieBoxes = (specieCheckboxes: CheckBoxElement[], analyses: Analysis[]): Analysis[] => {
  const selectedSpecies = specieCheckboxes.filter(s => s.selected).map(s => s.name);
  console.log(selectedSpecies, analyses.length, analyses.filter(a => selectedSpecies.includes(a.specimen.specie.name )).length)
  return analyses.filter(a => selectedSpecies.includes(a.specimen.specie.name ))
}

export const getFilteredAnalyses = (
  allAnalyses: Analysis[],
  dataTypeCheckboxes?: CheckBoxElement[],
  sexCheckboxes?: CheckBoxElement[],
  selectedAgeCategories?: string[],
  selecedAnimalStatuses?: string[],
  selectedVisualizationMethods?: string[],
  selectedReporters?: string[],
  selectedStrains?: string[],
  selectedSubstrains?: string[]
): Analysis[] => {
  let filteredAnalyses = allAnalyses;

  // Checkboxes
  if(dataTypeCheckboxes){
    const selectedDataTypes = dataTypeCheckboxes.filter(s => s.selected).map(s => s.name);
    filteredAnalyses = filteredAnalyses.filter(a => selectedDataTypes.includes(a.dataType ))
    // console.log("selectedDataTypes", allAnalyses.length, filteredAnalyses.length);
  }
  
  if(sexCheckboxes) {
    const selectedSexes = sexCheckboxes.filter(s => s.selected).map(s => s.name);
    filteredAnalyses = filteredAnalyses.filter(a => selectedSexes.includes(a.specimen?.sex?.name ))
    // console.log("selectedSexes", allAnalyses.length, filteredAnalyses.length);
  }

  // Dropdowns
  if(selecedAnimalStatuses?.length) {
    filteredAnalyses = filteredAnalyses.filter(a => selecedAnimalStatuses.includes(a.experiment.animalStatus))
    // console.log("selecedAnimalStatuses", allAnalyses.length, filteredAnalyses.length);
  }

  if(selectedVisualizationMethods?.length){
    filteredAnalyses = filteredAnalyses.filter(a => selectedVisualizationMethods.includes(a.visualizationMethod?.name))
    // console.log("selectedVisualizationMethods", allAnalyses.length, filteredAnalyses.length);
  }

  if(selectedStrains?.length) {
    filteredAnalyses = filteredAnalyses.filter(a => selectedStrains.includes(a.specimen?.strain?.name ))
    // console.log("strains", allAnalyses.length, filteredAnalyses.length);

    if(selectedSubstrains?.length) {
      filteredAnalyses = filteredAnalyses.filter(a => selectedSubstrains.includes(a.specimen?.substrain?.name ))
      // console.log("selectedSubstrains", allAnalyses.length, filteredAnalyses.length);
    }
  }

  if(selectedAgeCategories?.length){
    filteredAnalyses = filteredAnalyses.filter(a => selectedAgeCategories.includes(a.specimen?.ageCategory?.description ))
    // console.log("selectedAgeCategories", allAnalyses.length, filteredAnalyses.length);
  }  

  if(selectedReporters?.length) {
    filteredAnalyses = filteredAnalyses.filter(a => a.reporterIncubations.filter(b => selectedReporters.includes(b.reporter?.rrid)).length > 0)
    // console.log("selectedReporters", allAnalyses.length, filteredAnalyses.length);
  }
  return filteredAnalyses;
};


export const getAgeMarks = (ages: number[]): Mark[] =>
  [...new Set(ages)]
    .sort()
    .filter((age) => age !== null)
    .map((age) => ({ value: age, label: age.toString() }));

export const getCheckboxes = (elements: string[]): CheckBoxElement[] =>
  elements.map((elem, index) => ({
    id: index,
    name: elem,
    selected: true,
  }));

// TABLE STUFF 
export const headers = [
    { text: "Analysis name", val: "name" },
    { text: "Data types", val: "dataType" },
    { text: "Strain", val: "strain" },
    { text: "Substrain", val: "substrain" },
    { text: "Sex", val: "sex" },
    { text: "Cell type", val: "cellTypePutative" },
    { text: "Object of interest", val: "" }
  ];
  
export const getSubRows = (analysis: Analysis): TableRow[] => {
  const dataTypes: DataType[] = []
  analysis.quantitations.map(q => (dataTypes.push(q)));
  analysis.cellMorphologies.map(q => (dataTypes.push(q)));
  analysis.distributions.map(q => (dataTypes.push(q)));
  return(
  sortElements<DataType[]>(dataTypes, "asc", "id").map(dataType => (
    {
      id: `${analysis.id}-${dataType.id}`,
      link: `/analyses/${analysis.id}/${dataType.id}`,
      cells: [{ text: getAnalysisNameFormatted(dataType.name) }, {text:dataType.regionRecord?.primaryRegion?.name}]
    }
  ))
)}
  
export const getRows = (analyses: Analysis[]): TableRow[] => (
  analyses.map(analysis => (({
    id: analysis.id,
    cells: [
      { text: getAnalysisNameFormatted(analysis.name) },
      { text:  `${analysis.dataType} (${analysis.dataTypes?.length})` },
      { text: analysis.specimen?.strain?.name },
      { text: analysis.specimen?.substrain?.name },
      { text: analysis.specimen?.sex?.name },
      { text: analysis.cellTypePutative?.name },
      {text: analysis.objectOfInterest?.NeuralStructure?.name}
    ],
    subHeaders: [{ text: analysis.dataType}, { text: "Brain region" }],
    subRows: getSubRows(analysis)
  })))
);


export const getAnalysisNameFormatted = (name:string) => {
  const splittet = name.split("_");
  return splittet.length > 1 ? `${splittet[0]}, ${splittet[1]}` : "";
}