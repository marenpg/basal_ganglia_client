import { Analysis, DataType } from "../../utils/api/types";
import { CheckBoxElement } from "../../utils/types";
import { ExperimentWithDataTypes, TableSort } from "./types";
import { Mark } from "@material-ui/core";
import { TableRow } from "../Base/BgTable/types";
import { sortElements } from "../../utils";

export const getDataTypeBoxes = (
  experiments: ExperimentWithDataTypes[]
): CheckBoxElement[] => {
  let dataTypeSet: Set<string> = new Set();
  experiments.map((experiment) => {
    if (experiment.dataTypes) {
      dataTypeSet = new Set([...dataTypeSet].concat(experiment.dataTypes));
    }
  });

  const dataTypes = [...dataTypeSet].map((dataType, i) => ({
    id: i,
    name: dataType,
    selected: true,
  }));

  return dataTypes;
};

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
  dataTypeCheckboxes: CheckBoxElement[],
  sexCheckboxes: CheckBoxElement[],
  selectedAgeCategories: string[],
  selecedAnimalStatuses: string[],
  selectedVisualizationMethods: string[],
  selectedReporters: string[],
  selectedStrains: string[],
  selectedSubstrains: string[]
): Analysis[] => {
  let filteredAnalyses = allAnalyses;

  // Checkboxes
  const selectedDataTypes = dataTypeCheckboxes.filter(s => s.selected).map(s => s.name);
  filteredAnalyses = filteredAnalyses.filter(a => selectedDataTypes.includes(a.dataType ))
  console.log("selectedDataTypes", allAnalyses.length, filteredAnalyses.length);

  const selectedSexes = sexCheckboxes.filter(s => s.selected).map(s => s.name);
  filteredAnalyses = filteredAnalyses.filter(a => selectedSexes.includes(a.specimen?.sex?.name ))
  console.log("selectedSexes", allAnalyses.length, filteredAnalyses.length);

  // Dropdowns
  if(selecedAnimalStatuses.length > 0) {
    filteredAnalyses = filteredAnalyses.filter(a => selecedAnimalStatuses.includes(a.experiment.animalStatus))
    console.log("selecedAnimalStatuses", allAnalyses.length, filteredAnalyses.length);
  }

  if(selectedVisualizationMethods.length){
    filteredAnalyses = filteredAnalyses.filter(a => selectedVisualizationMethods.includes(a.visualizationMethod?.name))
    console.log("selectedVisualizationMethods", allAnalyses.length, filteredAnalyses.length);
  }

  if(selectedStrains.length) {
    filteredAnalyses = filteredAnalyses.filter(a => selectedStrains.includes(a.specimen?.strain?.name ))
    console.log("strains", allAnalyses.length, filteredAnalyses.length);

    if(selectedSubstrains.length) {
      filteredAnalyses = filteredAnalyses.filter(a => selectedSubstrains.includes(a.specimen?.substrain?.name ))
      console.log("selectedSubstrains", allAnalyses.length, filteredAnalyses.length);
    }
  }

  if(selectedAgeCategories.length){
    filteredAnalyses = filteredAnalyses.filter(a => selectedAgeCategories.includes(a.specimen?.ageCategory?.description ))
    console.log("selectedAgeCategories", allAnalyses.length, filteredAnalyses.length);
  }  

  if(selectedReporters.length) {
    filteredAnalyses = filteredAnalyses.filter(a => a.reporterIncubations.filter(b => selectedReporters.includes(b.reporter?.rrid)).length > 0)
    console.log("selectedReporters", allAnalyses.length, filteredAnalyses.length);
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
    { text: "Sex", val: "sex" }
  ];
  
export const getSubRows = (analysis: Analysis): TableRow[] => (
  sortElements<DataType[]>(analysis.dataTypes, "asc", "name").map(dataType => (
    {
      id: `${analysis.id}-${dataType.id}`,
      link: `/analyses/${analysis.id}/${dataType.id}`,
      subHeaders: [{ text: analysis.dataType }],
      cells: [{ text: dataType.name.replace(/_/g, ", ") }]
    }
  ))
)
  
export const getRows = (analyses: Analysis[]): TableRow[] => (
  analyses.map(analysis => (({
    id: analysis.id,
    cells: [
      { text: analysis.name },
      { text: analysis.dataType },
      { text: analysis.specimen?.strain?.name },
      { text: analysis.specimen?.substrain?.name },
      { text: analysis.specimen?.sex?.name }
    ],
    subRows: getSubRows(analysis)
  })))
);