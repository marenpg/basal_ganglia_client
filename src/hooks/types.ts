import {
  VisualizationProtocol,
  Analysis,
  Specie,
  Solution,
  Sex,
  Reporter,
  Strain,
  CellType,
  AgeCategory,
  BrainRegion,
} from "../utils/api/types";

export interface AnalysesData {
  Analysis: Analysis[];
  Specie: Specie[];
  Solution: Solution[];
  Sex: Sex[];
  VisualizationProtocol: VisualizationProtocol[];
  Reporter: Reporter[];
  Strain: Strain[];
  AgeCategory: AgeCategory[];
  BrainRegion: BrainRegion[];
  CellType: CellType[];
}

export interface AnalysisData {
  Analysis: Analysis[];
  allAnalyses: Analysis[];
}

export interface CellTypeData {
  CellType: CellType[];
}
