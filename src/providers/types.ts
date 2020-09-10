import {
  BrainRegion,
  Specie,
  CellType,
  CellGroup,
  CellClass,
  Experiment,
  Solution,
  Sex,
  VisualizationProtocol,
  Reporter,
  Analysis,
  Strain,
  AgeCategory,
  Quantitation,
  Distribution,
  CellMorphology,
} from "../utils/api/types";

export interface SimpleData {
  id: string;
}

export interface BrainRegionSpecieCellData {
  BrainRegion: BrainRegion[];
  Specie: Specie[];
}

export interface CellTypesAndSpecieData {
  CellGroup: CellGroup[];
  CellType: CellType[];
  Specie: Specie[];
  BrainRegion: BrainRegion[];
}

export interface BrainRegionContextValue {
  selectedRegion: BrainRegion;
  subRegions: BrainRegion[];
  cellTypes: CellType[];
  cellGroups: CellGroup[];
  cellClasses: CellClass[];
}

export interface ExperimentsContextValue {
  experiments: Experiment[];
  species: Specie[];
  solutions: Solution[];
  sex: Sex[];
  visualizationMethods: VisualizationProtocol[];
  reporters: Reporter[];
}

export interface AnalysesContextValue {
  analyses: Analysis[];
  species: Specie[];
  strains: Strain[];
  solutions: Solution[];
  sex: Sex[];
  visualizationMethods: VisualizationProtocol[];
  reporters: Reporter[];
  ageCategories: AgeCategory[];
  selectedBrainRegions?: BrainRegion[];
  selectedCellType?: CellType;
  filters?: {
    specie?: string;
    rrids?: string[];
    strains?: string[];
    brainRegion?: string;
    cellType?: string;
  };
}

export interface AnalysisContextValue {
  selectedAnalysis: Analysis;
  selectedData: Quantitation | Distribution | CellMorphology | undefined;
  allAnalyses: Analysis[];
}

export interface CellTypeContextValue {
  selectedCellType: CellType;
}

export interface ExperimentContextValue {
  selectedExperiment: Experiment;
}
